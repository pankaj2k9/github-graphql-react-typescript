import React from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Content,
  Container,
  Main,
  LeftSide,
  RightSide,
  Repos,
  Tab,
 } from './styles';

import RepoCard from '../../components/RepoCard';
import LoadingPage from '../../components/LoadingPage';

import { useSearchUsersQuery } from "../../generated/graphql";

import { APIUser, APIRepo } from '../../@types';

interface Data {
  user?: APIUser;
  repos?: APIRepo[];
  error?: string;
}

const Userlist: React.FC = () => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const  [searchParams, setSearchParams] = useSearchParams()
   const search = searchParams.get("q")

   const userResponse:any = useSearchUsersQuery({ variables: {
    query: search || "",
    first: 20
  }})


  if (userResponse && userResponse[0]?.error) {
    return <h1>{userResponse[0].error.message}</h1>;
  }

  if (userResponse && !userResponse[0]?.data?.search?.edges) {
    return <LoadingPage/>
  }

  const data = userResponse[0].data?.search?.edges[0].node
  const TabContent = () => (
    <Content>
        <span className="number">{data.repositories?.totalCount}</span>  <span className="label">repository result or view <a href={`https://github.com/search?q=${search}`} >all results on GitHub</a> </span>
    </ Content>
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
            Tets
        </LeftSide>

        <RightSide>
          <Tab className="mobile">
            <TabContent />
            <span className="line" />
          </Tab>

          <Repos>
            <h2>Repositories List</h2>

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
        </RightSide>
      </Main>
    </Container>
  );
}

export default Userlist;