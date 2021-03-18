import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import {
  Add,
  Apps,
  BookmarkBorder,
  Drafts,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@material-ui/icons";
import { SidebarOption } from "components";
import { db } from "../firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";

const options = [
  { icon: InsertComment, title: "Threads" },
  { icon: Inbox, title: "Mentions & reactions" },
  { icon: Drafts, title: "Saved items" },
  { icon: BookmarkBorder, title: "Channel browser" },
  { icon: PeopleAlt, title: "People & user groups" },
  { icon: Apps, title: "Apps" },
  { icon: FileCopy, title: "File browser" },
  { icon: ExpandLess, title: "Show less" },
];

const Sidebar = () => {
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  return (
    <SidebarContainer>
      {/* SIDEBAR HEADER */}
      <SidebarHeader>
        <SidebarInfo>
          <h2>Brian Dev</h2>
          <h3>
            <FiberManualRecordIcon />
            Brian Polanco
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      {/* SIDEBAR OPTIONS */}
      {options.map((option, i) => (
        <SidebarOption key={i} Icon={option.icon} title={option.title} />
      ))}

      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  margin-top: 60px;
  max-width: 260px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    color: #49274b;
    padding: 8px;
    background: white;
    border-radius: 999px;
    margin-left: auto;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    margin-bottom: 5px;
    font-weight: 900;
  }

  > h3 {
    display: flex;
    font-weight: 400;
    font-size: 13px;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
