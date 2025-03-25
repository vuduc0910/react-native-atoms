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
  const transformKey = (key: string) => {
    return key.replace(".", "_");
  };

  // RADIUS
  let radiusStyles = "";
  for (const [key, value] of Object.entries(radius)) {
    radiusStyles += `
          rounded_${key}: {
            borderRadius: ${value},
          },\n
          rounded_t_${key}: {
            borderTopLeftRadius: ${value},
            borderTopRightRadius: ${value},
          },
          rounded_b_${key}: {
            borderBottomLeftRadius: ${value},
            borderBottomRightRadius: ${value},
          },
        `;
  }

  // TYPOGRAPHY
  let textStyles = `
        text_left: {
          textAlign: 'left',
        },
        text_center: {
          textAlign: 'center',
        },
        text_right: {
          textAlign: 'right',
        },
        italic: {
          fontStyle: 'italic',
        },
        uppercase: {
          textTransform: 'uppercase',
        },
        leading_tight: {
          lineHeight: 1.15,
        },
        leading_snug: {
          lineHeight: 1.3,
        },
        leading_normal: {
          lineHeight: 1.5,
        },
        underline: {
          textDecorationLine: 'underline',
        },
        line_through: {
          textDecorationLine: 'line-through',
        },
      `;
  for (const [key, value] of Object.entries(fontSizes)) {
    textStyles += `text_${key}: {
          fontSize: ${value},
      },\n`;
  }

  for (const [key, value] of Object.entries(fontWeights)) {
    textStyles += `font_${key}: {
          fontWeight: ${value},
      },\n`;
  }

  // PADDING & MARGIN & GAP
  let paddingStyles = "";
  let marginStyles = "";
  let gapStyles = "";

  for (const [key, value] of Object.entries(sizes)) {
    paddingStyles += `p_${transformKey(key)}: {
          padding: ${value},
      },\n`;
    paddingStyles += `pt_${transformKey(key)}: {
          paddingTop: ${value},
      },\n`;
    paddingStyles += `pr_${transformKey(key)}: {
          paddingRight: ${value},
      },\n`;
    paddingStyles += `pb_${transformKey(key)}: {
          paddingBottom: ${value},
      },\n`;
    paddingStyles += `pl_${transformKey(key)}: {
          paddingLeft: ${value},
      },\n`;
    paddingStyles += `px_${transformKey(key)}: {
          paddingLeft: ${value},
          paddingRight: ${value},
      },\n`;
    paddingStyles += `py_${transformKey(key)}: {
          paddingTop: ${value},
          paddingBottom: ${value},
      },\n`;

    marginStyles += `m_${transformKey(key)}: {
          margin: ${value},
      },\n`;
    marginStyles += `mt_${transformKey(key)}: {
          marginTop: ${value},
      },\n`;
    marginStyles += `mr_${transformKey(key)}: {
          marginRight: ${value},
      },\n`;
    marginStyles += `mb_${transformKey(key)}: {
          marginBottom: ${value},
      },\n`;
    marginStyles += `ml_${transformKey(key)}: {
          marginLeft: ${value},
      },\n`;
    marginStyles += `mx_${transformKey(key)}: {
          marginLeft: ${value},
          marginRight: ${value},
      },\n`;
    marginStyles += `my_${transformKey(key)}: {
          marginTop: ${value},
          marginBottom: ${value},
      },\n`;

    gapStyles += `gap_${transformKey(key)}: {
          gap: ${value},
      },\n`;
  }

  // WIDTH & HEIGHT
  let widthStyles = `
        w_full: {
          width: '100%',
        },
        w_auto: {
          width: 'auto',
        },
      `;
  for (const [key, value] of Object.entries(sizes)) {
    widthStyles += `w_${transformKey(key)}: {
          width: ${value},
      },\n`;
  }

  let heightStyles = `
        h_full: {
          height: '100%',
        },
        h_auto: {
          height: 'auto',
        },
      `;
  for (const [key, value] of Object.entries(sizes)) {
    heightStyles += `h_${transformKey(key)}: {
          height: ${value},
        },\n`;
  }

  // Border Width
  let borderWidthStyles = "";
  for (const [key, value] of Object.entries(stroke)) {
    borderWidthStyles += `border_${transformKey(key)}: {
          borderWidth: ${value},
        },\n`;
    borderWidthStyles += `border_t_${transformKey(key)}: {
          borderTopWidth: ${value},
        },\n`;
    borderWidthStyles += `border_r_${transformKey(key)}: {
          borderRightWidth: ${value},
        },\n`;
    borderWidthStyles += `border_b_${transformKey(key)}: {
          borderBottomWidth: ${value},
        },\n`;
    borderWidthStyles += `border_l_${transformKey(key)}: {
          borderLeftWidth: ${value},
        },\n`;
  }

  // Shadows
  let shadowStyles = "";
  for (const [key, value] of Object.entries(shadows)) {
    shadowStyles += `shadow_${transformKey(key)}: {
          shadowOffset: {
            width: ${value.shadowOffset.width},
            height: ${value.shadowOffset.height},
          },
          shadowRadius: ${value.shadowRadius},
          shadowOpacity: ${value.shadowOpacity},
          elevation: ${value.elevation},
        },\n`;
  }

  // Resize modes
  const resizeModes = [
    "cover",
    "contain",
    "stretch",
    "repeat",
    "center",
  ] as const;
  let resizeModeStyles = "";
  for (const resizeMode of resizeModes) {
    resizeModeStyles += `resize_${resizeMode}: {
          resizeMode: '${resizeMode}',
        },\n`;
  }

  // background colors
  let backgroundColorStyles = "";
  let colorStyles = "";
  let borderColorStyles = "";
  for (const [key, value] of Object.entries(colors)) {
    if (Array.isArray(value)) {
      for (const [index, color] of value.entries()) {
        backgroundColorStyles += `bg_${transformKey(key)}_${index}: {
          backgroundColor: '${color}',
        },\n`;
        colorStyles += `text_${transformKey(key)}_${index}: {
          color: '${color}',
        },\n`;
        borderColorStyles += `border_${transformKey(key)}_${index}: {
          borderColor: '${color}',
        },\n`;
      }
    } else {
      backgroundColorStyles += `bg_${transformKey(key)}: {
        backgroundColor: '${value}',
      },\n`;
      colorStyles += `text_${transformKey(key)}: {
        color: '${value}',
      },\n`;
      borderColorStyles += `border_${transformKey(key)}: {
        borderColor: '${value}',
      },\n`;
    }
  }
  let fontFamilyStyles = "";
  for (const [key, value] of Object.entries(fontFamilies)) {
    fontFamilyStyles += `font_${transformKey(key)}: {
      fontFamily: '${value}',
    },\n`;
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
        ${paddingStyles}
        ${marginStyles}
        ${gapStyles}
        ${widthStyles}
        ${heightStyles}
        ${borderWidthStyles}
        ${shadowStyles}
        ${resizeModeStyles}
        ${backgroundColorStyles}
        ${colorStyles}
        ${borderColorStyles}
        ${fontFamilyStyles}
      } as const
      `;
  return content;
}
