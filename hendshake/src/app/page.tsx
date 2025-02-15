"use client";
import { useState, useEffect } from "react";

interface Task {
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.0);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const parsedTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks(parsedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim() || isNaN(Number(price)) || Number(price) <= 0) return;
    const newTask: Task = {
      activity,
      price: Number(price),
      type,
      bookingRequired,
      accessibility,
    };
    setTasks([...tasks, newTask]);
    setActivity("");
    setPrice("");
    setType("");
    setBookingRequired(false);
    setAccessibility(0.0);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-xl font-bold">HENDSHAKE</h1>
      </div>
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-xl font-bold">To-Do List</h1>
      </div>
      <form onSubmit={addTask} className="space-y-3 mb-4">
        <label className="block">
          <span className="font-semibold">Activity</span>
          <input
            type="text"
            placeholder="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </label>
        <div className="flex space-x-2">
          <label className="w-1/2">
            <span className="font-semibold">Price</span>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </label>
          <label className="w-1/2">
            <span className="font-semibold">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 w-full rounded"
            >
              {[
                "Education",
                "Recreational",
                "Social",
                "Diy",
                "Charity",
                "Cooking",
                "Relaxation",
                "Music",
                "Busywork",
              ].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={() => setBookingRequired(!bookingRequired)}
          />
          <span>Booking Required</span>
        </label>
        <label className="block">
          <span>Accessibility: {accessibility}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={accessibility}
            onChange={(e) => setAccessibility(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-xl font-bold">Item List</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">List Item</span>
        <span className="font-semibold">{tasks.length} items</span>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <div>
                <strong>Activity:</strong> {task.activity}
              </div>
              <div className="flex space-x-4">
                <div>
                  <strong>Price:</strong> RM {task.price}
                </div>
                <div>
                  <strong>Type:</strong> {task.type}
                </div>
              </div>
              <div>
                <strong>Booking Required:</strong>{" "}
                {task.bookingRequired ? "Yes" : "No"}
              </div>
              <div>
                <strong>Accessibility:</strong> {task.accessibility}
              </div>
            </div>
            <button
              onClick={() => removeTask(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
