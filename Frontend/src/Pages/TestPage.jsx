import {
  DropdownMenu,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
  Dropdown,
  Input,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetData as FetchFeed } from "../Redux/Slices/FeedSlice";
import { useState } from "react";
import { Feed } from "../Component/HomePage/Feed";

export function TestPage() {
  const Dispatch = useDispatch();
  const SelectData = useSelector((state) => state.feed.GetData ?? []);

  useEffect(() => {
    Dispatch(FetchFeed());
  }, []);
  const [Status, SetStatus] = useState(false);
  const [Item, SetItem] = useState("");

  const Category = ["IT solution", "Construction", "Programing", "Marketing"];
  const FilterFeed = Item
    ? SelectData.filter((Post) => Post.projectCategory == Item)
    : SelectData;

  const HandlePick = (option) => {
    SetStatus(true);
    SetItem(option);
  };

  return (
    <div>
      <Dropdown
        text="Filter Posts"
        icon="filter"
        floating
        labeled
        button
        className="icon"
      >
        <DropdownMenu>
          <Input icon="search" iconPosition="left" className="search" />
          <DropdownDivider />
          <DropdownHeader icon="tags" content="Tag Label" />
          <DropdownMenu scrolling>
            {Category.map((option, index) => (
              <DropdownItem
                key={index}
                text={option}
                onClick={() => HandlePick(option)}
              />
            ))}
          </DropdownMenu>
        </DropdownMenu>
      </Dropdown>
      {Item && Status && (
        <div>
          <Feed data={FilterFeed} />
        </div>
      )}
    </div>
  );
}
export default TestPage;
