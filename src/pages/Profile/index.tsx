import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  Main,
  LeftSide,
  RightSide,
  Repos,
  CalendarHeading,
  RepoIcon,
  Tab
 } from './styles';

import ProfileData from '../../components/ProfileData';
import RepoCard from '../../components/RepoCard';
import RandomCalendar from '../../components/RandomCalendar';
import LoadingPage from '../../components/LoadingPage';

import { useSearchUsersQuery } from "../../generated/graphql";

import { APIUser, APIRepo } from '../../@types';

interface Data {
  user?: APIUser;
  repos?: APIRepo[];
  error?: string;
}

const Profile: React.FC = () => {
  const { username = "pankaj2k9" } = useParams();

  const userResponse:any = useSearchUsersQuery({ variables: {
    query: username,
    first: 1
  }})


  if (userResponse && userResponse[0]?.error) {
    return <h1>{userResponse[0].error.message}</h1>;
  }

  if (userResponse && !userResponse[0]?.data?.search?.edges) {
    return <LoadingPage/>
  }

  const data = userResponse[0].data?.search?.edges[0]?.node

  if(!data) {
    return <h1>Profile is not found with the username.</h1>;
  }
  const TabContent = () => (
    <div className="content">
      <RepoIcon />
      <span className="label">Repositories</span>
      <span className="number">{data.repositories?.totalCount}</span>
    </div>
  );


  return (
    <Container>
      <Tab className="desktop">
        <div className="wrapper">
          <span className="offset"/>
          <TabContent />
        </div>
    
        <span className="line"/>
      </Tab>
      <Main>
        <LeftSide>
          <ProfileData
            username={data.login}
            name={data.name}
            avatarUrl={data.avatarUrl}
            followers={data.followers.totalCount}
            following={data.following.totalCount}
            company={data.company}
            location={data.location}
            email={data.email}
            blog={data.blog}
          />
        </LeftSide>

        <RightSide>
          <Tab className="mobile">
            <TabContent />
            <span className="line" />
          </Tab>

          <Repos>
            <h2>Random Repos</h2>

            <div>
              {data?.repositories?.edges?.length > 0 && data?.repositories?.edges?.map(( item : any) => (
                <RepoCard
                  key={item.node.name}
                  username={item.node.owner.login}
                  reponame={item.node.name}
                  description={item.node.description}
                  language={item?.node?.languages?.edges[0]?.node.name }
                  stars={item.node.stargazerCount}
                  forks={item.node.forks.totalCount}
                />
              ))}
            </div>
          </Repos>
          <CalendarHeading>
            Random calendar (do not represent actual data)
          </CalendarHeading>
          <RandomCalendar />
        </RightSide>
      </Main>
    </Container>
  );
}

export default Profile;