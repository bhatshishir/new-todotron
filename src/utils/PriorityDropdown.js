import { Dropdown } from "react-bootstrap";

const PriorityDropdown = ({ setPriority, priority, setNewPriority, edit }) => {
  const dropColor = {
    1: "danger",
    2: "success",
    3: "primary",
  };

  const handlePriorityChange = (newVal) => {
    if (edit) {
      setNewPriority(newVal);
    } else {
      setPriority(newVal);
    }
  };

  return (
    <Dropdown className="mb-2">
      <Dropdown.Toggle variant={dropColor[priority]} id="dropdown-basic">
        Priority {priority}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handlePriorityChange(1)}>
          Priority 1
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriorityChange(2)}>
          Priority 2
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriorityChange(3)}>
          Priority 3
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PriorityDropdown;