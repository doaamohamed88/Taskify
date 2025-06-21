import React, { useEffect, useRef, useState } from "react";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import styles from "./Members.module.css";

const Members = ({ boardMembers, cardMembers, setCardMembers, closeMember }) => {
  const memberRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle clicks outside the member card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (memberRef.current && !memberRef.current.contains(event.target)) {
        closeMember(); // Hide the member card
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter board members based on search query
  const filteredBoardMembers = boardMembers.filter(
    (member) =>
      (member?.name || member?.email)?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
      !cardMembers.some((cm) => cm._id === member._id)
  );

  const addMember = (member) => {
    setCardMembers([...cardMembers, member]);
  };

  const removeMember = (memberId) => {
    setCardMembers(cardMembers.filter((member) => member._id !== memberId));
  };

  return (
    <div className={styles.membersContainer} ref={memberRef}>
      <h3>Members</h3>
      <div className={styles.cardMembers}>
        <h4>Card Members</h4>
        {cardMembers.map((member) => (
          <div key={member._id} className={styles.memberItem}>
            <span className={styles.memberAvatar}>
              {(member?.name || member?.email)?.slice(0, 2).toUpperCase()}
            </span>
            <span className={styles.memberName}>{member.name || member.email}</span>
            <FaTimes
              className={styles.removeIcon}
              onClick={() => removeMember(member._id)}
            />
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search members"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.boardMembers}>
        <h4>Board Members</h4>
        {filteredBoardMembers.map((member) => (
          <div key={member._id} className={styles.memberItem}>
            <span className={styles.memberAvatar}>
              {(member?.name || member?.email)?.slice(0, 2).toUpperCase()}
            </span>
            <span className={styles.memberName}>{member.name || member.email}</span>
            <FaUserPlus
              className={styles.addIcon}
              onClick={() => addMember(member)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
