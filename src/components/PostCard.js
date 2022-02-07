import { Card, CardContent, CardHeader, Typography } from "@mui/material";


const PostCard = ({data}) => {
  if(!data) return null;
  const {title, body} = data;

  return (
    <Card>
      <CardHeader title={title}/>
      <CardContent>
        <Typography>
          {body}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default PostCard;