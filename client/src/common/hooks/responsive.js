import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

export const useBreakpoint = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.down('lg'));
  const isExtraLarge = useMediaQuery(theme.breakpoints.down('xl'));

  if (isSmall) return 'sm';
  if (isMedium) return 'md';
  if (isLarge) return 'lg';
  if (isExtraLarge) return 'xl';
};
