import React, { useCallback, useState } from "react";

const ListItem = React.memo(({ item, onClick }: { item: string; onClick: (item: string) => void }) => {
  console.log(`Rendering ${item}`);
  return <li onClick={() => onClick(item)}>{item}</li>;
});

const App = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [selected, setSelected] = useState("");

  const handleClick = useCallback((item: string) => {
    setSelected(item);
  }, []);
  const [userId, setUserId] = useState(1);

useEffect(() => {
  console.log(`Fetching user ${userId}`);
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}, [userId]);


  return (
    <div>
      <h2>Selected: {selected}</h2>
      <ul>
        {items.map((item) => (
          <ListItem key={item} item={item} onClick={handleClick} />
        ))}
      </ul>
    </div>
  );
};

export default App;
