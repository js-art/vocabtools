import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {IconWrapper} from "./IconWrapper";
import {ItemCounter} from "./ItemCounter";
import {BugIcon} from "./BugIcon";


function Sidebar() {
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[250px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      <ListboxItem
        key="issues"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <BugIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Lightener
      </ListboxItem>

      <ListboxItem
        key="issues1"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <BugIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Flash Cards
      </ListboxItem>

      <ListboxItem
        key="issues2"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <BugIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Grammar Notes
      </ListboxItem>


      <ListboxItem
        key="issues3"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <BugIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Categories
      </ListboxItem>

      <ListboxItem
        key="issues4"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <BugIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Courses
      </ListboxItem>

      <ListboxItem
        key="issues5"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <BugIcon className="text-lg " />
          </IconWrapper>
        }
      >
        Courses Notes
      </ListboxItem>

    </Listbox>
  );
}

export default Sidebar
