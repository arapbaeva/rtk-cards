import React from "react";
import { styled } from "styled-components";
import LOGO from "assets/images/logo.svg";
import { useAppSelector } from "common/hooks";
import IMG from "assets/images/image-2.png";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

export const Header = () => {
  const name = useAppSelector((state) => state.auth.profile?.name);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <HeaderContainer>
      <NavWrapper>
        <Logo alt="Logo" src={LOGO} />
        {isLoggedIn ? (
          <NavLink to={"/profile"}>
            {name ? name : "No name )"}
            <Ava alt="Travis Howard" src={IMG} />
          </NavLink>
        ) : (
          <NavLink to={"/login"}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </NavLink>
        )}
      </NavWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  padding: 6px 136px;
  height: 60px;
  background-color: #fcfcfc;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 46px;
`;

const Ava = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
`;
