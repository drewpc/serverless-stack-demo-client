import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react';
import NoteFilter from './NoteFilter';

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers();
});

test('keyboard input is debounced', () => {
  jest.useFakeTimers();

  const mockFilterFunc = jest.fn();
  render(<NoteFilter filterFunction={mockFilterFunc}/>);
  const formInput = screen.getByLabelText(/Filter notes by:/i);

  const sampleText = 'filterstring';
  userEvent.type(formInput, sampleText)

  expect(clearTimeout).toHaveBeenCalledTimes(sampleText.length);
  expect(setTimeout).toHaveBeenCalledTimes(sampleText.length + 2);

  jest.advanceTimersByTime(500);

  expect(mockFilterFunc.mock.calls.length).toBe(1);
  expect(mockFilterFunc.mock.calls[0][0]).toBe(sampleText);
});
