import { useEffect, useState } from "react"; // useMemo
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import CustomModal from "../../Component/Modal";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addGistIDToIsClicked } from "../../store/gist.reducer";
import {
  getGithubUsers,
  getGithubUsersByUserID,
} from "../../service/getGistUser";

import "./style.css";
import { Checkbox } from "@mui/material";

const MediaCard = () => {
  const [data, setData] = useState<any>();
  const [userName, setSearchUserName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isGistClicked, isGistModalOpen } = useAppSelector((state) => ({
    isGistClicked: state.gist.isGistClicked,
    isGistModalOpen: state.gist.isGistModalOpen,
  }));

  useEffect(() => {
    getGithubUsers().then((data) => setData(data));
  }, []);
  // id
  return (
    <>
      <div className="header">
        <Typography
          className="page-heading"
          variant="button"
          gutterBottom
          component="div"
        >
          {" "}
          Public Gists User{" "}
        </Typography>
        <div className="header-right">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 500,
            }}
          >
            <InputBase
              onChange={(e) => {
                setSearchUserName(e.target.value);
              }}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Gist User"
            />
            <IconButton
              onClick={() => {
                userName === ""
                  ? getGithubUsers().then((data) => setData(data))
                  : getGithubUsersByUserID(userName).then((data) => {
                      setData(data);
                    });
              }}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div className="card-container">
        {data?.map((repoData: any, index: number) => {
          return (
            <Card className="card" key={index} sx={{ maxWidth: 504 }}>
              <CardMedia
                component="img"
                height="140"
                image={repoData.owner.avatar_url}
                alt="green iguana"
              />
              <CardContent>
                <div className="card-body">
                  <Typography
                    variant="button"
                    className="card-primary-name"
                    gutterBottom
                    component="div"
                    onClick={() => {
                      dispatch(addGistIDToIsClicked(repoData.id));
                    }}
                  >
                    {repoData.owner.login}
                  </Typography>
                  <Checkbox checked={isGistClicked.includes(repoData.id)} />
                </div>
              </CardContent>
              {isGistModalOpen === repoData.id && (
              <CustomModal
                show={isGistModalOpen === repoData.id}
                repoData={repoData}
              />
            )}
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default MediaCard;
