const { addPathname } = useAppCtx();

useEffect(() => {
  addPathname("/cart")
}, []);