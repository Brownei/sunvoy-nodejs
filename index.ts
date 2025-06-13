import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "./helper";
import fs from "fs";

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
    "https://api.challenge.sunvoy.com/api/settings"
  );
  return {
    status,
    currentUser,
  };
}

function main() {
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
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        console.error(
          "Error response and status are: ",
          error.response?.data,
          error.response?.status
        );
      } else {
        console.error("Error");
      }
    });

  getCurrentUser()
    .then((response) => response)
    .then(({ status, currentUser }) => {
      if (status == 200) {
        try {
          const jsonData = fs.readFileSync("users.json").toString();

          const user = JSON.parse(jsonData);

          user.push(currentUser)

          fs.writeFileSync("users.json", user)
        } catch (error) {}
      }
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
      } else {
      }
    });
}

main();
