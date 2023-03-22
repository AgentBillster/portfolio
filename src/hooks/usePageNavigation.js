import { useState } from "react";
import { useTransition } from "@react-spring/web";

export const usePageNavigation = (pages) => {
  const [hookProps, setHookProps] = useState({
    page: Object.keys(pages)[0],
    data: null,
  });

  const navigate = (page, data) => {
    setHookProps({
      page: page,
      data: data ? data : null,
    });
  };

  const transitions = useTransition(hookProps.page, {
    keys: hookProps.page,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 400,
    },
    reset: true,
  });

  const getPage = (item, style) => {
    const Page = pages[item];
    return <Page style={style} data={hookProps.data ? hookProps.data : null} />;
  };

  const currentPage = hookProps.page;

  return { navigate, transitions, getPage, currentPage };
};
