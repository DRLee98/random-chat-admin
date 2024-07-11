import styled, { useTheme } from "styled-components";

import { NavLink } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import NoticeList from "@/components/notice/NoticeList";
import AccusationList from "@/components/accusation/AccusationList";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Container>
      <Section>
        <SpaceBetween>
          <SectionTitle>공지사항</SectionTitle>
          <NavLink to="/notice/create">
            <FaPlusCircle size={24} color={theme.green.default} />
          </NavLink>
        </SpaceBetween>
        <NoticeList />
      </Section>
      <Section>
        <SectionTitle>의견</SectionTitle>
        <div>의견 목록</div>
      </Section>
      <Section>
        <SectionTitle>신고</SectionTitle>
        <AccusationList />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;

  width: 100%;
  height: 100%;

  padding: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  min-width: fit-content;

  font-size: 1.5rem;
  font-weight: bold;
`;

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default HomePage;
