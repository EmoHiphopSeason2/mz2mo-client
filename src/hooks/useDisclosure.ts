import React, { useMemo, useState } from 'react';

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  return useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prevState) => !prevState),
    }),
    [isOpen],
  );
};

export default useDisclosure;
