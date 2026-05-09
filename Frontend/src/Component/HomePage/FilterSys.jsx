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
import { GetData as FetchFeed } from "../../Redux/Slices/FeedSlice";
import { useState } from "react";
import { Feed } from "../HomePage/Feed";

export function FilterSys() {
  const Dispatch = useDispatch();
  const SelectData = useSelector((state) => state.feed.GetData ?? []);

  useEffect(() => {
    Dispatch(FetchFeed());
  }, []);

  const [Status, SetStatus] = useState(false);
  const [Item, SetItem] = useState("");

  const Category = ["ITsolution", "Construction", "Programing", "Marketing"];

  const FilterFeed = Item
    ? SelectData.filter((Post) => {
        return Post.projectCategory == Item;
      })
    : SelectData;

  const HandlePick = (option) => {
    SetItem(option);
  };

  const ResetAll = () => {
    SetItem("");
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
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          border: "none",
        }}
      >
        <DropdownMenu className="">
          <DropdownMenu scrolling>
            <DropdownItem onClick={() => ResetAll()}>ShowAll</DropdownItem>
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

      <div>
        <Feed data={FilterFeed} />
      </div>
    </div>
  );
}
export default FilterSys;
