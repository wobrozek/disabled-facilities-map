import { Skeleton } from '@mui/material/';

function PlaceDialogSkeleton() {
  return (
    <div className="dialog-popup">
      <div className="dialog-popup__photo">
        <Skeleton variant="rectangular" width={300} height={150} />
      </div>
      <div className="dialog-popup__data-display">
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="text"
          width={300}
          height={30}
        />
        <Skeleton variant="text" width={300} height={30} />
        <Skeleton variant="text" width={300} height={30} />
      </div>
      <div className="dialog-popup__user">
        <Skeleton variant="text" width={400} height={30} />
        <Skeleton variant="text" width={100} height={30} />
      </div>
    </div>
  );
}

export default PlaceDialogSkeleton;
