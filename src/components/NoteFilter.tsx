import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";

import NoteFilterReplace from "./NoteFilterReplace";

export default function NoteFilter(props: {
    bulkReplaceFunction: (filter: string, value: string) => void,
    filterFunction: (value: string) => void,
}): JSX.Element {
    const [filter, setFilter] = useState("");
    const filterTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        filterTimeout.current = setTimeout(() => {
            // TODO: sanitize this string to make it safe.
            props.filterFunction(filter);
        }, 500);
        return () => clearTimeout(filterTimeout.current as ReturnType<typeof setTimeout>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, props.filterFunction]);

    return (
        <div className="NoteFilter">
            <Form.Group controlId="note-filter">
                <Form.Label>Filter notes by: </Form.Label>
                <Form.Control
                    value={filter}
                    type="text"
                    placeholder="Enter text to filter notes"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </Form.Group>
            {filter && <NoteFilterReplace bulkReplaceFunction={props.bulkReplaceFunction} filter={filter} />}
        </div>
    )
}
