import styled from '@emotion/styled';

import { COLOR_PRIMARY, CUBIC_BEZIER_TRANSITION, ThemeInterface } from '../utils/theme';

type ButtonProps = {
	circular: boolean;
	theme?: ThemeInterface;
	href?: string;
	target?: string;
	rel?: string;
};

const Button = styled('button')<ButtonProps>((props) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: props.circular ? '50%' : 4,
	background: 'transparent',
	border: `1px solid ${props.theme.borderColor}`,
	padding: props.circular ? 16 : '16px 32px',
	transition: CUBIC_BEZIER_TRANSITION,
	cursor: 'pointer',
	color: 'inherit',
	'&:hover, &:focus': {
		outline: 0,
		color: COLOR_PRIMARY,
		boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)',
		borderColor: props.theme.borderHoverColor,
	},
}));

export default Button;
