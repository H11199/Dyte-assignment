import React, { useEffect, useState } from "react";
import axios from "axios";
import { PetsTwoTone } from "@material-ui/icons";
const PastebinAPI = require("pastebin-js");

function SaveCode() {
  const [post, setPost] = useState(null);
  function createPost() {
    let tokenStr = "xxyyzz";
    const headers = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://pastebin.com/api/api_login.php",
        {
          api_dev_key: "sz7r59oRc57hIyYLo1uzRPfeFOHzxYqZ",
          api_user_name: "Himanshu1119",
          api_user_password: "cssharma1234@",
        },
        { headers }
      )
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <button
      type="button"
      onClick={createPost}
      class="btn btn-primary col-2 savebutton"
    >
      Save
    </button>
  );
}
export default SaveCode;
