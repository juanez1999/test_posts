import { Card, CardContent, CardHeader, Typography } from "@mui/material";


const PostCard = ({data}) => {
  if(!data) return null;
  const {title, body} = data;

  return (
    <Card>
      <CardHeader title={title} sx={{color: '#21A9D3'}}/>
      <CardContent>
        <Typography sx={{color: '#6B6B6B'}}> 
          {body}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default PostCard;