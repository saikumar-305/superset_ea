import React, { Suspense } from 'react';
import { MatxLoading } from 'src/ea_oyster_components/matx';

const MatxSuspense = props => {
  return <Suspense fallback={<MatxLoading />}>{props.children}</Suspense>;
};

export default MatxSuspense;
