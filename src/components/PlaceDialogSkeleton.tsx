import Skeleton from '@mui/material/Skeleton';

function PlaceDialogSkeleton() {
  return (
    <div className="dialog-popup">
      <Skeleton variant="rectangular" width={300} height={150} />
    </div>
  );
}

export default PlaceDialogSkeleton;
