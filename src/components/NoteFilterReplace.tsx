import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function NoteFilterReplace(props: {
    bulkReplaceFunction: (filter: string, value: string) => void,
    filter: string,
}): JSX.Element {
    const [replace, setReplace] = useState("");

    const doReplace = () => {
        const confirmed = window.confirm(
            `Are you sure you want to replace all instances of '${props.filter}' with '${replace}'?`
        );

        if (!confirmed) {
            return;
        }

        props.bulkReplaceFunction(props.filter, replace);
    }

    return (<Form.Group controlId="note-replace">
            <Form.Label>Replace all filtered text with: </Form.Label>
            <Form.Control
                value={replace}
                type="text"
                placeholder="Enter replacement text"
                onChange={(e) => setReplace(e.target.value)}
            />
            <Button disabled={replace === ""} variant="primary" onClick={doReplace}>
                Replace all instances of '{props.filter}' with '{replace}'
            </Button>
        </Form.Group>
    )
}
