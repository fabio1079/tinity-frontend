import styled from "styled-components";

import loading from "../assets/images/loading.gif";

const LoadingImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export default function Loading() {
  return <LoadingImg src={loading} alt="Loading" />;
}
