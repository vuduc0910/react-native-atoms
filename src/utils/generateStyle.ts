const transformKey = (key: string) => key.replace(".", "_");

function generateSpacingStyles(sizes: Record<string, number>) {
  let padding = "";
  let margin = "";
  let gap = "";

  for (const [key, value] of Object.entries(sizes)) {
    const k = transformKey(key);
    padding += `p_${k}: { padding: ${value} },\n`;
    padding += `pt_${k}: { paddingTop: ${value} },\n`;
    padding += `pr_${k}: { paddingRight: ${value} },\n`;
    padding += `pb_${k}: { paddingBottom: ${value} },\n`;
    padding += `pl_${k}: { paddingLeft: ${value} },\n`;
    padding += `px_${k}: { paddingLeft: ${value}, paddingRight: ${value} },\n`;
    padding += `py_${k}: { paddingTop: ${value}, paddingBottom: ${value} },\n`;

    margin += `m_${k}: { margin: ${value} },\n`;
    margin += `mt_${k}: { marginTop: ${value} },\n`;
    margin += `mr_${k}: { marginRight: ${value} },\n`;
    margin += `mb_${k}: { marginBottom: ${value} },\n`;
    margin += `ml_${k}: { marginLeft: ${value} },\n`;
    margin += `mx_${k}: { marginLeft: ${value}, marginRight: ${value} },\n`;
    margin += `my_${k}: { marginTop: ${value}, marginBottom: ${value} },\n`;

    gap += `gap_${k}: { gap: ${value} },\n`;
  }

  return { padding, margin, gap };
}

function generateDimensionStyles(sizes: Record<string, number>) {
  let width = `
w_full: { width: '100%' },
w_auto: { width: 'auto' },
`;
  let height = `
h_full: { height: '100%' },
h_auto: { height: 'auto' },
`;

  for (const [key, value] of Object.entries(sizes)) {
    const k = transformKey(key);
    width += `w_${k}: { width: ${value} },\n`;
    height += `h_${k}: { height: ${value} },\n`;
  }

  return { width, height };
}

function generateBorderWidthStyles(stroke: Record<string, number>) {
  let styles = "";
  for (const [key, value] of Object.entries(stroke)) {
    const k = transformKey(key);
    styles += `border_${k}: { borderWidth: ${value} },\n`;
    styles += `border_t_${k}: { borderTopWidth: ${value} },\n`;
    styles += `border_r_${k}: { borderRightWidth: ${value} },\n`;
    styles += `border_b_${k}: { borderBottomWidth: ${value} },\n`;
    styles += `border_l_${k}: { borderLeftWidth: ${value} },\n`;
  }
  return styles;
}

function generateColorStyles(colors: Record<string, string | string[]>) {
  let bg = "";
  let text = "";
  let border = "";

  for (const [key, value] of Object.entries(colors)) {
    const k = transformKey(key);
    if (Array.isArray(value)) {
      for (const [index, color] of value.entries()) {
        bg += `bg_${k}_${index}: { backgroundColor: '${color}' },\n`;
        text += `text_${k}_${index}: { color: '${color}' },\n`;
        border += `border_${k}_${index}: { borderColor: '${color}' },\n`;
      }
    } else {
      bg += `bg_${k}: { backgroundColor: '${value}' },\n`;
      text += `text_${k}: { color: '${value}' },\n`;
      border += `border_${k}: { borderColor: '${value}' },\n`;
    }
  }

  return { bg, text, border };
}

export function generateStyle({
  radius,
  fontSizes,
  fontWeights,
  sizes,
  stroke,
  shadows,
  colors,
  fontFamilies,
}: {
  radius: Record<string, number>;
  fontSizes: Record<string, number>;
  fontWeights: Record<string, string | number | undefined>;
  sizes: Record<string, number>;
  stroke: Record<string, number>;
  fontFamilies: Record<string, string>;
  shadows: Record<
    string,
    {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowRadius: number;
      shadowOpacity: number;
      elevation: number;
    }
  >;
  colors: Record<string, string | string[]>;
}) {
  // RADIUS
  let radiusStyles = "";
  for (const [key, value] of Object.entries(radius)) {
    radiusStyles += `rounded_${key}: { borderRadius: ${value} },\n`;
    radiusStyles += `rounded_t_${key}: { borderTopLeftRadius: ${value}, borderTopRightRadius: ${value} },\n`;
    radiusStyles += `rounded_b_${key}: { borderBottomLeftRadius: ${value}, borderBottomRightRadius: ${value} },\n`;
  }

  // TYPOGRAPHY
  let textStyles = `
text_left: { textAlign: 'left' },
text_center: { textAlign: 'center' },
text_right: { textAlign: 'right' },
italic: { fontStyle: 'italic' },
uppercase: { textTransform: 'uppercase' },
leading_tight: { lineHeight: 1.15 },
leading_snug: { lineHeight: 1.3 },
leading_normal: { lineHeight: 1.5 },
underline: { textDecorationLine: 'underline' },
line_through: { textDecorationLine: 'line-through' },
`;
  for (const [key, value] of Object.entries(fontSizes)) {
    textStyles += `text_${key}: { fontSize: ${value} },\n`;
  }

  const spacing = generateSpacingStyles(sizes);
  const dimensions = generateDimensionStyles(sizes);
  const borderWidthStyles = generateBorderWidthStyles(stroke);
  const colorStyles = generateColorStyles(colors);

  // Shadows
  let shadowStyles = "";
  for (const [key, value] of Object.entries(shadows)) {
    shadowStyles += `shadow_${transformKey(key)}: {
  shadowOffset: { width: ${value.shadowOffset.width}, height: ${value.shadowOffset.height} },
  shadowRadius: ${value.shadowRadius},
  shadowOpacity: ${value.shadowOpacity},
  elevation: ${value.elevation},
},\n`;
  }

  // Resize modes
  let resizeModeStyles = "";
  for (const resizeMode of ["cover", "contain", "stretch", "repeat", "center"] as const) {
    resizeModeStyles += `resize_${resizeMode}: { resizeMode: '${resizeMode}' },\n`;
  }

  // Font families
  let fontFamilyStyles = "";
  for (const [key, value] of Object.entries(fontFamilies)) {
    fontFamilyStyles += `font_${transformKey(key)}: { fontFamily: '${value}' },\n`;
  }

  // Font weights
  let fontWeightStyles = "";
  for (const w of [300, 400, 500, 600, 700, 800, 900]) {
    fontWeightStyles += `font_weight_${w}: { fontWeight: '${w}' },\n`;
  }

  const content = `/* Auto-generated. DO NOT EDIT. */
      import { Platform } from 'react-native'

      export const atoms = {
        fixed: {
          position: Platform.select({web: 'fixed', native: 'absolute'}) as 'absolute',
        },
        absolute: {
          position: 'absolute',
        },
        relative: {
          position: 'relative',
        },
        inset_0: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        z_10: {
          zIndex: 10,
        },
        z_20: {
          zIndex: 20,
        },
        z_30: {
          zIndex: 30,
        },
        z_40: {
          zIndex: 40,
        },
        z_50: {
          zIndex: 50,
        },
        overflow_hidden: {
          overflow: 'hidden',
        },
        flex: {
          display: 'flex',
        },
        flex_col: {
          flexDirection: 'column',
        },
        flex_row: {
          flexDirection: 'row',
        },
        flex_col_reverse: {
          flexDirection: 'column-reverse',
        },
        flex_row_reverse: {
          flexDirection: 'row-reverse',
        },
        flex_wrap: {
          flexWrap: 'wrap',
        },
        flex_nowrap: {
          flexWrap: 'nowrap',
        },
        flex_1: {
          flex: 1,
        },
        flex_grow: {
          flexGrow: 1,
        },
        flex_shrink: {
          flexShrink: 1,
        },
        flex_shrink_0: {
          flexShrink: 0,
        },
        justify_start: {
          justifyContent: 'flex-start',
        },
        justify_center: {
          justifyContent: 'center',
        },
        justify_between: {
          justifyContent: 'space-between',
        },
        justify_end: {
          justifyContent: 'flex-end',
        },
        align_center: {
          alignItems: 'center',
        },
        align_start: {
          alignItems: 'flex-start',
        },
        align_end: {
          alignItems: 'flex-end',
        },
        align_baseline: {
          alignItems: 'baseline',
        },
        align_stretch: {
          alignItems: 'stretch',
        },
        self_auto: {
          alignSelf: 'auto',
        },
        self_start: {
          alignSelf: 'flex-start',
        },
        self_end: {
          alignSelf: 'flex-end',
        },
        self_center: {
          alignSelf: 'center',
        },
        self_stretch: {
          alignSelf: 'stretch',
        },
        self_baseline: {
          alignSelf: 'baseline',
        },
        aspect_square: {
          aspectRatio: 1,
        },

        ${radiusStyles}
        ${textStyles}
        ${spacing.padding}
        ${spacing.margin}
        ${spacing.gap}
        ${dimensions.width}
        ${dimensions.height}
        ${borderWidthStyles}
        ${shadowStyles}
        ${resizeModeStyles}
        ${colorStyles.bg}
        ${colorStyles.text}
        ${colorStyles.border}
        ${fontFamilyStyles}
        ${fontWeightStyles}
      } as const
      `;
  return content;
}
