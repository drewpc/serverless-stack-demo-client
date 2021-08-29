import React, {useState} from "react";
import Form from "react-bootstrap/Form";

export default function NoteFilter(props: {
    filterFunction: (value: string) => void,
}): JSX.Element {
    const [filter, setFilter] = useState("");

    let filterTimeout: ReturnType<typeof setTimeout>;
    const doFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const unsafeUserInputValue: string = e.target.value;
        setFilter(unsafeUserInputValue);

        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {
            // TODO: sanitize this string to make it safe.
            props.filterFunction(unsafeUserInputValue);
        }, 500);
    }

    return (
        <div className="NoteFilter">
            <Form>
                <Form.Group controlId="filter">
                    <Form.Label>Filter notes by: </Form.Label>
                    <Form.Control
                        value={filter}
                        type="text"
                        placeholder="Enter text to filter notes"
                        onChange={doFilter}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}
