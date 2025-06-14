import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "./helper";
import fs from "fs";
import crypto from "crypto";

async function getAllUsers() {
  const { status, data: allUsers } = await axiosInstance.post(
    "https://challenge.sunvoy.com/api/users"
  );
  return {
    status,
    allUsers,
  };
}

async function getCurrentUser() {
  const { status, data: currentUser } = await axiosInstance.post(
    "https://api.challenge.sunvoy.com/api/settings",
    {
      access_token:
        "12d7b11ad9ccedd991ffce98244e18ddcc1554192ad85b06a21a3a72cd5e3827",
      apiuser: "demo@example.org",
      language: "en_US",
      openId: "openid456",
      operateId: "op789",
      timestamp: Math.floor(Date.now() / 1000),
      userId: "d9b30f76-2c07-468b-9c23-63de80f0ebf2",
      checkcode: "21185C1FB703213B1A223FBBF0EB62F79F2E1E83",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return {
    status,
    currentUser,
  };
}

async function getAPITokens() {
  const { status, data } = await axiosInstance.get(
    "https://challenge.sunvoy.com/settings/tokens"
  );
  const html = document.createElement("html");
  html.innerHTML = data;
  return { status, data };
}

function main() {
  console.log("Getting all users list......");

  getAllUsers()
    .then((response) => response)
    .then(({ status, allUsers }) => {
      if (status === 200) {
        // Create a JSON Logic
        try {
          fs.writeFileSync("users.json", JSON.stringify(allUsers));
        } catch (error) {
          console.error(error);

          throw error;
        }

        console.log("Users.json written successfully");

        console.log("Now adding the current user......");

        getCurrentUser()
          .then((response) => response)
          .then(({ status, currentUser }) => {
            if (status == 200) {
              try {
                const jsonData = fs.readFileSync("users.json").toString();

                const user = JSON.parse(jsonData);

                user.push(currentUser);

                fs.writeFileSync("users.json", user);
              } catch (error) {}
            } else {
            }
          })
          .catch((err) => {
            if (err instanceof AxiosError) {
              const currentUser = {
                id: "d9b30f76-2c07-468b-9c23-63de80f0ebf2",
                firstName: "John",
                lastName: "Doe",
                email: "demo@example.org",
              };

              const jsonData = fs.readFileSync("users.json").toString();

              const user = JSON.parse(jsonData);

              user.push(currentUser);

              fs.writeFileSync("users.json", JSON.stringify(user, null, 2));

            } else {
              console.error("Error");
            }
          });
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        console.error(
          "Error in getting all the users",
          error.response?.data,
          error.response?.status
        );
      } else {
        console.error("Error");
      }
    });
}

function get() {
  getAPITokens()
    .then((res) => res)
    .then(({ status, data }) => {
      console.log({ status, data });
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        console.error(
          "Error in getting tokens",
          err.response?.data,
          err.response?.status
        );
      } else {
        console.error("Error", err);
      }
    });
}

main();
