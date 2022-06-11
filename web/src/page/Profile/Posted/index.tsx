import {
    Typography,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from '@mui/material';

interface PinterestImage {
    base64ImageString: string;
    content: string;
    createdTime: Date;
    postId: string;
    postReactCount: number;
    postStatus: string;
    postTitle: string;
    postUrl: string;
    updatedTime: string;
    user: string;
}

interface Props {
    listPostId: PinterestImage[] | undefined;
}
const Posted = ({ listPostId }: Props) => {
    if (!listPostId) {
        return <Typography variant="h5">You don't have any post!</Typography>;
    } else {
        return (
            <>
                <ImageList sx={{ width: 500, height: 450 }}>
                    {listPostId.map((item) => (
                        <ImageListItem key={item.base64ImageString}>
                            <img
                                src={`${item.base64ImageString}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.base64ImageString}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.content}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.content}
                                subtitle={<span>by: {item.user}</span>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </>
        );
    }
    // console.log(listPostId);
    // !listPostId ? (
    //     <Typography variant="h5">You don't have any post!</Typography>
    // ) : (
    //     <>
    //         <ImageList sx={{ width: 500, height: 450 }}>
    //             {listPostId.map((item) => (
    //                 <ImageListItem key={item.base64ImageString}>
    //                     <img
    //                         src={`${item.base64ImageString}?w=248&fit=crop&auto=format`}
    //                         srcSet={`${item.base64ImageString}?w=248&fit=crop&auto=format&dpr=2 2x`}
    //                         alt={item.content}
    //                         loading="lazy"
    //                     />
    //                     <ImageListItemBar
    //                         title={item.content}
    //                         subtitle={<span>by: {item.user}</span>}
    //                         position="below"
    //                     />
    //                 </ImageListItem>
    //             ))}
    //         </ImageList>
    //     </>
    // );
};

export default Posted;
