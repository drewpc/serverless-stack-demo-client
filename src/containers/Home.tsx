import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
// @ts-ignore  - there are no types for this library at the moment.
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { loadNotes, saveNote } from "../libs/apiLib";
import LoadingIndicator from "../components/LoadingIndicator";
import NoteFilter from "../components/NoteFilter";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState<Array<UxNote>>([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const visibleNotes = notes.filter(({_visible}: UxNote) => _visible);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notesFromApi: Array<ApiNote> = await loadNotes();
        setNotes(notesFromApi.map((n) => {
            (n as UxNote)._visible = true;
            return n as UxNote;
        }));
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function escapeRegExp(str: string): string {
    // https://stackoverflow.com/a/6969486
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  const filterNotes = (value: string): void => {
      const valueComparison = new RegExp(escapeRegExp(value), "im");
      setNotes(
          notes.map((n) => {
              n._visible = valueComparison.test(n.content);
              return n;
          })
      );
  }

  const bulkStringReplacement = async (filterStr: string, replaceValue: string) => {
      const valueComparison = new RegExp(escapeRegExp(filterStr), "img");

      setIsLoading(true);
      try {
          for (let i = 0; i < visibleNotes.length; i++) {
              let n = visibleNotes[i];
              n.content = n.content.replaceAll(valueComparison, replaceValue);
              await saveNote(n);
          }
      } catch (e) {
          onError(e);
      } finally {
          setIsLoading(false);
      }
  }

    function renderNotesList() {
    return (
      <>
        <NoteFilter filterFunction={filterNotes} bulkReplaceFunction={bulkStringReplacement}/>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        {visibleNotes.map(({ noteId, content, createdAt }: UxNote) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{isLoading ? <LoadingIndicator /> : renderNotesList()}</ListGroup>
      </div>
    );
  }
  
  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
