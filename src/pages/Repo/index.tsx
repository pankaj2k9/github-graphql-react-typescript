import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';

import {
  Container,
  Breadcrumb,
  RepoIcon,
  Stats,
  StarIcon,
  ForkIcon,
  LinkButton,
  GithubIcon,
} from './styles';

import { useRepoDetailsQuery } from "../../generated/graphql";

import { APIRepo } from '../../@types';

interface Data {
  repo?: APIRepo;
  error?: string;
}

const Repo: React.FC = () => {
  const { username = "", reponame = "" } = useParams();

  const repoResponse : any = useRepoDetailsQuery({ variables: {
    name: reponame,
    owner: username
  }})
  console.log("reponame",reponame)
  console.log("repoResponse",repoResponse)


  if (repoResponse && repoResponse[0]?.data?.error) {
    return <h1>{repoResponse?.data?.error}</h1>;
  }

  if (repoResponse && !repoResponse[0]?.data?.repository) {
    return <LoadingPage/>;
  }

  const data = repoResponse[0]?.data?.repository

  if(!data) {
    return <h1>Repo is not found with the username and reponame.</h1>;
  }

  return (
    <Container>
      <Breadcrumb>
        <RepoIcon />

        <Link className={'username'} to={`/${username}`}>
          {username}
        </Link>

        <span>/</span>

        <Link className={'reponame'} to={`/${username}/${reponame}`}>
          {reponame}
        </Link>
      </Breadcrumb>

      <p>{data.description}</p>

      <Stats>
        <li>
          <StarIcon />
          <b>{data.stargazerCount}</b>
          <span>stars</span>
        </li>
        <li>
          <ForkIcon />
          <b>{data.forkCount}</b>
          <span>forks</span>
        </li>
      </Stats>

      <LinkButton href={data.url}>
        <GithubIcon />
        <span>View on GitHub</span>
      </LinkButton>
    </Container>
  );
};

export default Repo;