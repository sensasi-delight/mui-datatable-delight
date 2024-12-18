'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _Reflect$construct = require('@babel/runtime-corejs3/core-js-stable/reflect/construct');
var _Object$keys = require('@babel/runtime-corejs3/core-js-stable/object/keys');
var _Object$getOwnPropertySymbols = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols');
var _Object$getOwnPropertyDescriptor = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor');
var _Object$getOwnPropertyDescriptors = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors');
var _Object$defineProperties = require('@babel/runtime-corejs3/core-js-stable/object/define-properties');
var _Object$defineProperty = require('@babel/runtime-corejs3/core-js-stable/object/define-property');
var _extends = require('@babel/runtime-corejs3/helpers/extends');
var _toConsumableArray = require('@babel/runtime-corejs3/helpers/toConsumableArray');
var _objectWithoutProperties = require('@babel/runtime-corejs3/helpers/objectWithoutProperties');
var _typeof = require('@babel/runtime-corejs3/helpers/typeof');
var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _possibleConstructorReturn = require('@babel/runtime-corejs3/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime-corejs3/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime-corejs3/helpers/inherits');
var _defineProperty = require('@babel/runtime-corejs3/helpers/defineProperty');
var _indexOfInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/index-of');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/map');
var _Object$values = require('@babel/runtime-corejs3/core-js-stable/object/values');
var _forEachInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/for-each');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var _reduceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/reduce');
var _spliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/splice');
var _sortInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/sort');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _findIndexInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/find-index');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _Object$assign = require('@babel/runtime-corejs3/core-js-stable/object/assign');
var _bindInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/bind');
var _someInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/some');
var _everyInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/every');
var Paper = require('@mui/material/Paper');
var MuiTable = require('@mui/material/Table');
var MuiTooltip = require('@mui/material/Tooltip');
var mui = require('tss-react/mui');
var clsx = require('clsx');
var assignwith = require('lodash.assignwith');
var cloneDeep = require('lodash.clonedeep');
var find = require('lodash.find');
var isEqual = require('lodash.isequal');
var isUndefined = require('lodash.isundefined');
var merge = require('lodash.merge');
var PropTypes = require('prop-types');
var React = require('react');
var _startsWithInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/starts-with');
var Typography = require('@mui/material/Typography');
var MuiTableBody = require('@mui/material/TableBody');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
var TableCell = require('@mui/material/TableCell');
var TableRow = require('@mui/material/TableRow');
var Checkbox = require('@mui/material/Checkbox');
var jsxRuntime = require('react/jsx-runtime');
var IconButton = require('@mui/material/IconButton');
var KeyboardArrowRightIcon = require('@mui/icons-material/KeyboardArrowRight');
var RemoveIcon = require('@mui/icons-material/Remove');
var _trimInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/trim');
var _URL = require('@babel/runtime-corejs3/core-js-stable/url');
var Button = require('@mui/material/Button');
var FormControl = require('@mui/material/FormControl');
var FormControlLabel = require('@mui/material/FormControlLabel');
var FormGroup = require('@mui/material/FormGroup');
var Grid = require('@mui/material/Grid');
var Input = require('@mui/material/Input');
var InputLabel = require('@mui/material/InputLabel');
var ListItemText = require('@mui/material/ListItemText');
var MenuItem = require('@mui/material/MenuItem');
var Select = require('@mui/material/Select');
var TextField = require('@mui/material/TextField');
var Chip = require('@mui/material/Chip');
var MuiTablePagination = require('@mui/material/TablePagination');
var _parseInt = require('@babel/runtime-corejs3/core-js-stable/parse-int');
var InputBase = require('@mui/material/InputBase');
var Toolbar = require('@mui/material/Toolbar');
var _slicedToArray = require('@babel/runtime-corejs3/helpers/slicedToArray');
var MuiTableHead = require('@mui/material/TableHead');
var _setTimeout = require('@babel/runtime-corejs3/core-js-stable/set-timeout');
var HelpIcon = require('@mui/icons-material/Help');
var TableSortLabel = require('@mui/material/TableSortLabel');
var _Object$entries = require('@babel/runtime-corejs3/core-js-stable/object/entries');
var reactDnd = require('react-dnd');
var MuiPopover = require('@mui/material/Popover');
var CloseIcon = require('@mui/icons-material/Close');
var Grow = require('@mui/material/Grow');
var SearchIcon = require('@mui/icons-material/Search');
var ClearIcon = require('@mui/icons-material/Clear');
var DownloadIcon = require('@mui/icons-material/CloudDownload');
var PrintIcon = require('@mui/icons-material/Print');
var ViewColumnIcon = require('@mui/icons-material/ViewColumn');
var FilterIcon = require('@mui/icons-material/FilterList');
var ReactToPrint = require('react-to-print');
var DeleteIcon = require('@mui/icons-material/Delete');
var reactDndHtml5Backend = require('react-dnd-html5-backend');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');

var _excluded$6 = ["children", "colIndex", "columnHeader", "options", "dataIndex", "rowIndex", "className", "print", "tableId"];
var useStyles$a = mui.makeStyles({
  name: 'MUIDataTableBodyCell'
})(function (theme) {
  return {
    root: {},
    cellHide: {
      display: 'none'
    },
    simpleHeader: _defineProperty({}, theme.breakpoints.down('sm'), {
      display: 'inline-block',
      fontWeight: 'bold',
      width: '100%',
      boxSizing: 'border-box'
    }),
    simpleCell: _defineProperty({}, theme.breakpoints.down('sm'), {
      display: 'inline-block',
      width: '100%',
      boxSizing: 'border-box'
    }),
    stackedHeader: {
      verticalAlign: 'top'
    },
    stackedCommon: _defineProperty({}, theme.breakpoints.down('md'), {
      display: 'inline-block',
      fontSize: '16px',
      height: 'auto',
      width: 'calc(50%)',
      boxSizing: 'border-box',
      '&:last-child': {
        borderBottom: 'none'
      },
      '&:nth-last-of-type(2)': {
        borderBottom: 'none'
      }
    }),
    stackedCommonAlways: {
      display: 'inline-block',
      fontSize: '16px',
      height: 'auto',
      width: 'calc(50%)',
      boxSizing: 'border-box',
      '&:last-child': {
        borderBottom: 'none'
      },
      '&:nth-last-of-type(2)': {
        borderBottom: 'none'
      }
    },
    stackedParent: _defineProperty({}, theme.breakpoints.down('md'), {
      display: 'inline-block',
      fontSize: '16px',
      height: 'auto',
      width: 'calc(100%)',
      boxSizing: 'border-box'
    }),
    stackedParentAlways: {
      display: 'inline-block',
      fontSize: '16px',
      height: 'auto',
      width: 'calc(100%)',
      boxSizing: 'border-box'
    },
    cellStackedSmall: _defineProperty({}, theme.breakpoints.down('md'), {
      width: '50%',
      boxSizing: 'border-box'
    }),
    responsiveStackedSmall: _defineProperty({}, theme.breakpoints.down('md'), {
      width: '50%',
      boxSizing: 'border-box'
    }),
    responsiveStackedSmallParent: _defineProperty({}, theme.breakpoints.down('md'), {
      width: '100%',
      boxSizing: 'border-box'
    })
  };
});
function TableBodyCell(props) {
  var _context;
  var _useStyles = useStyles$a(),
    classes = _useStyles.classes;
  var children = props.children,
    colIndex = props.colIndex,
    columnHeader = props.columnHeader,
    options = props.options,
    dataIndex = props.dataIndex,
    rowIndex = props.rowIndex,
    className = props.className,
    print = props.print,
    tableId = props.tableId,
    otherProps = _objectWithoutProperties(props, _excluded$6);
  var onCellClick = options.onCellClick;
  var handleClick = React.useCallback(function (event) {
    onCellClick(children, {
      colIndex: colIndex,
      rowIndex: rowIndex,
      dataIndex: dataIndex,
      event: event
    });
  }, [onCellClick, children, colIndex, rowIndex, dataIndex]);

  // Event listeners. Avoid attaching them if they're not necessary.
  var methods = {};
  if (onCellClick) {
    methods.onClick = handleClick;
  }
  var cells = [/*#__PURE__*/React.createElement("div", {
    key: 1,
    className: clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      lastColumn: colIndex === 2
    }, classes.root, true), classes.cellHide, true), classes.stackedHeader, true), classes.stackedCommon, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth'), classes.stackedCommonAlways, options.responsive === 'verticalAlways'), classes.cellStackedSmall, options.responsive === 'stacked' || options.responsive === 'stackedFullWidth' && (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')), classes.simpleHeader, options.responsive === 'simple'), 'datatables-noprint', !print), className)
  }, columnHeader), /*#__PURE__*/React.createElement("div", {
    key: 2,
    className: clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, classes.root, true), classes.stackedCommon, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth'), classes.stackedCommonAlways, options.responsive === 'verticalAlways'), classes.responsiveStackedSmall, options.responsive === 'stacked' || options.responsive === 'stackedFullWidth' && (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')), classes.simpleCell, options.responsive === 'simple'), 'datatables-noprint', !print), className)
  }, typeof children === 'function' ? children(dataIndex, rowIndex) : children)];
  var innerCells;
  if (_indexOfInstanceProperty(_context = ['standard', 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth']).call(_context, options.responsive) !== -1) {
    innerCells = _sliceInstanceProperty(cells).call(cells, 1, 2);
  } else {
    innerCells = cells;
  }
  return /*#__PURE__*/React.createElement(TableCell, _extends({}, methods, {
    "data-colindex": colIndex,
    "data-tableid": tableId,
    className: clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, classes.root, true), classes.stackedParent, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth'), classes.stackedParentAlways, options.responsive === 'verticalAlways'), classes.responsiveStackedSmallParent, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth' && (options.setTableProps().padding === 'none' || options.setTableProps().size === 'small')), classes.simpleCell, options.responsive === 'simple'), 'datatables-noprint', !print), className)
  }, otherProps), innerCells);
}

var _excluded$5 = ["classes", "options", "rowSelected", "onClick", "className", "isRowSelectable"];
function _callSuper$7(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$7() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$7() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$7 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultBodyRowStyles = function defaultBodyRowStyles(theme) {
  return {
    root: {
      // material v4
      '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected
      },
      // material v3 workaround
      '&.mui-row-selected': {
        backgroundColor: theme.palette.action.selected
      }
    },
    hoverCursor: {
      cursor: 'pointer'
    },
    responsiveStacked: _defineProperty({}, theme.breakpoints.down('md'), {
      borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
      borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
      padding: 0,
      margin: 0
    }),
    responsiveSimple: _defineProperty({}, theme.breakpoints.down('sm'), {
      borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
      borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
      padding: 0,
      margin: 0
    })
  };
};
var TableBodyRow = /*#__PURE__*/function (_React$Component) {
  function TableBodyRow() {
    _classCallCheck(this, TableBodyRow);
    return _callSuper$7(this, TableBodyRow, arguments);
  }
  _inherits(TableBodyRow, _React$Component);
  return _createClass(TableBodyRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        options = _this$props.options,
        rowSelected = _this$props.rowSelected,
        onClick = _this$props.onClick,
        className = _this$props.className,
        isRowSelectable = _this$props.isRowSelectable,
        rest = _objectWithoutProperties(_this$props, _excluded$5);
      var methods = {};
      if (onClick) {
        methods.onClick = onClick;
      }
      return /*#__PURE__*/React.createElement(TableRow, _extends({
        hover: options.rowHover ? true : false
      }, methods, {
        className: clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, classes.root, true), classes.hover, options.rowHover), classes.hoverCursor, options.selectableRowsOnClick && isRowSelectable || options.expandableRowsOnClick), classes.responsiveSimple, options.responsive === 'simple'), classes.responsiveStacked, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth'), 'mui-row-selected', rowSelected), className),
        selected: rowSelected
      }, rest), this.props.children);
    }
  }]);
}(React.Component);
_defineProperty(TableBodyRow, "propTypes", {
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Callback to execute when row is clicked */
  onClick: PropTypes.func,
  /** Current row selected or not */
  rowSelected: PropTypes.bool,
  /** Extend the style applied to components */
  classes: PropTypes.object
});
var TableBodyRow$1 = mui.withStyles(TableBodyRow, defaultBodyRowStyles, {
  name: 'MUIDataTableBodyRow'
});

function ExpandButton(_a) {
    var areAllRowsExpanded = _a.areAllRowsExpanded, buttonClass = _a.buttonClass, expandableRowsHeader = _a.expandableRowsHeader, expandedRows = _a.expandedRows, iconClass = _a.iconClass, iconIndeterminateClass = _a.iconIndeterminateClass, isHeaderCell = _a.isHeaderCell, onExpand = _a.onExpand;
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: isHeaderCell && !areAllRowsExpanded() && areAllRowsExpanded && expandedRows.data.length > 0 ? (jsxRuntime.jsx(IconButton, { onClick: onExpand, style: { padding: 0 }, disabled: expandableRowsHeader === false, className: buttonClass, children: jsxRuntime.jsx(RemoveIcon, { id: "expandable-button", className: iconIndeterminateClass }) })) : (jsxRuntime.jsx(IconButton, { onClick: onExpand, style: { padding: 0 }, disabled: expandableRowsHeader === false, className: buttonClass, children: jsxRuntime.jsx(KeyboardArrowRightIcon, { id: "expandable-button", className: iconClass }) })) }));
}

var _excluded$4 = ["fixedHeader", "fixedSelectColumn", "isHeaderCell", "expandableOn", "selectableOn", "isRowExpanded", "onExpand", "isRowSelectable", "selectableRowsHeader", "hideExpandButton", "expandableRowsHeader", "expandedRows", "areAllRowsExpanded", "selectableRowsHideCheckboxes", "setHeadCellRef", "dataIndex", "components"];
var useStyles$9 = mui.makeStyles({
  name: 'MUIDataTableSelectCell'
})(function (theme) {
  return {
    root: {
      '@media print': {
        display: 'none'
      }
    },
    fixedHeader: {
      position: 'sticky',
      top: '0px',
      zIndex: 100
    },
    fixedLeft: {
      position: 'sticky',
      left: '0px',
      zIndex: 100
    },
    icon: {
      cursor: 'pointer',
      transition: 'transform 0.25s'
    },
    expanded: {
      transform: 'rotate(90deg)'
    },
    hide: {
      visibility: 'hidden'
    },
    headerCell: {
      zIndex: 110,
      backgroundColor: theme.palette.background.paper
    },
    expandDisabled: {},
    checkboxRoot: {},
    checked: {},
    disabled: {}
  };
});
var TableSelectCell = function TableSelectCell(_ref) {
  var fixedHeader = _ref.fixedHeader,
    fixedSelectColumn = _ref.fixedSelectColumn,
    _ref$isHeaderCell = _ref.isHeaderCell,
    isHeaderCell = _ref$isHeaderCell === void 0 ? false : _ref$isHeaderCell,
    _ref$expandableOn = _ref.expandableOn,
    expandableOn = _ref$expandableOn === void 0 ? false : _ref$expandableOn,
    _ref$selectableOn = _ref.selectableOn,
    selectableOn = _ref$selectableOn === void 0 ? 'none' : _ref$selectableOn,
    _ref$isRowExpanded = _ref.isRowExpanded,
    isRowExpanded = _ref$isRowExpanded === void 0 ? false : _ref$isRowExpanded,
    onExpand = _ref.onExpand,
    isRowSelectable = _ref.isRowSelectable,
    selectableRowsHeader = _ref.selectableRowsHeader,
    hideExpandButton = _ref.hideExpandButton,
    expandableRowsHeader = _ref.expandableRowsHeader,
    expandedRows = _ref.expandedRows,
    _ref$areAllRowsExpand = _ref.areAllRowsExpanded,
    areAllRowsExpanded = _ref$areAllRowsExpand === void 0 ? function () {
      return false;
    } : _ref$areAllRowsExpand,
    selectableRowsHideCheckboxes = _ref.selectableRowsHideCheckboxes,
    setHeadCellRef = _ref.setHeadCellRef,
    dataIndex = _ref.dataIndex,
    _ref$components = _ref.components,
    components = _ref$components === void 0 ? {} : _ref$components,
    otherProps = _objectWithoutProperties(_ref, _excluded$4);
  var _useStyles = useStyles$9(),
    classes = _useStyles.classes;
  var CheckboxComponent = components.Checkbox || Checkbox;
  var ExpandButtonComponent = components.ExpandButton || ExpandButton;
  if (expandableOn === false && (selectableOn === 'none' || selectableRowsHideCheckboxes === true)) {
    return null;
  }
  var cellClass = clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, classes.root, true), classes.fixedHeader, fixedHeader && isHeaderCell), classes.fixedLeft, fixedSelectColumn), classes.headerCell, isHeaderCell));
  var buttonClass = clsx(_defineProperty({}, classes.expandDisabled, hideExpandButton));
  var iconClass = clsx(_defineProperty(_defineProperty(_defineProperty({}, classes.icon, true), classes.hide, isHeaderCell && !expandableRowsHeader), classes.expanded, isRowExpanded || isHeaderCell && areAllRowsExpanded()));
  var iconIndeterminateClass = clsx(_defineProperty(_defineProperty({}, classes.icon, true), classes.hide, isHeaderCell && !expandableRowsHeader));
  var refProp = {};
  if (setHeadCellRef) {
    refProp.ref = function (el) {
      setHeadCellRef(0, 0, el);
    };
  }
  var renderCheckBox = function renderCheckBox() {
    if (isHeaderCell && (selectableOn !== 'multiple' || selectableRowsHeader === false)) {
      // only display the header checkbox for multiple selection.
      return null;
    }
    return /*#__PURE__*/React.createElement(CheckboxComponent, _extends({
      classes: {
        root: classes.checkboxRoot,
        checked: classes.checked,
        disabled: classes.disabled
      },
      "data-description": isHeaderCell ? 'row-select-header' : 'row-select',
      "data-index": dataIndex || null,
      color: "primary",
      disabled: !isRowSelectable
    }, otherProps));
  };
  return /*#__PURE__*/React.createElement(TableCell, _extends({
    className: cellClass,
    padding: "checkbox"
  }, refProp), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, expandableOn && /*#__PURE__*/React.createElement(ExpandButtonComponent, {
    isHeaderCell: isHeaderCell,
    areAllRowsExpanded: areAllRowsExpanded,
    expandedRows: expandedRows,
    onExpand: onExpand,
    expandableRowsHeader: expandableRowsHeader,
    buttonClass: buttonClass,
    iconIndeterminateClass: iconIndeterminateClass,
    iconClass: iconClass,
    dataIndex: dataIndex
  }), selectableOn !== 'none' && selectableRowsHideCheckboxes !== true && renderCheckBox()));
};
TableSelectCell.propTypes = {
  /** Select cell checked on/off */
  checked: PropTypes.bool.isRequired,
  /** Select cell part of fixed header */
  fixedHeader: PropTypes.bool,
  /** Callback to trigger cell update */
  onChange: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object,
  /** Is expandable option enabled */
  expandableOn: PropTypes.bool,
  /** Adds extra class, `expandDisabled` when the row is not expandable. */
  hideExpandButton: PropTypes.bool,
  /** Is selectable option enabled */
  selectableOn: PropTypes.string,
  /** Select cell disabled on/off */
  isRowSelectable: PropTypes.bool
};

function buildMap(rows) {
  return _reduceInstanceProperty(rows).call(rows, function (accum, _ref) {
    var dataIndex = _ref.dataIndex;
    accum[dataIndex] = true;
    return accum;
  }, {});
}
function escapeDangerousCSVCharacters(data) {
  if (typeof data === 'string') {
    // Places single quote before the appearance of dangerous characters if they
    // are the first in the data string.
    return data.replace(/^\+|^\-|^\=|^\@/g, "'$&");
  }
  return data;
}
function warnDeprecated(warning) {
  var consoleWarnings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var consoleWarn = typeof consoleWarnings === 'function' ? consoleWarnings : console.warn;
  if (consoleWarnings) {
    consoleWarn("Deprecation Notice:  ".concat(warning));
  }
}
function warnInfo(warning) {
  var consoleWarnings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var consoleWarn = typeof consoleWarnings === 'function' ? consoleWarnings : console.warn;
  if (consoleWarnings) {
    consoleWarn("".concat(warning));
  }
}
function getPageValue(count, rowsPerPage, page) {
  var totalPages = count <= rowsPerPage ? 1 : Math.ceil(count / rowsPerPage);

  // `page` is 0-indexed
  return page >= totalPages ? totalPages - 1 : page;
}
function getCollatorComparator() {
  if (!!Intl) {
    var collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    return collator.compare;
  }
  var fallbackComparator = function fallbackComparator(a, b) {
    return a.localeCompare(b);
  };
  return fallbackComparator;
}
function sortCompare(order) {
  return function (a, b) {
    var aData = a.data === null || typeof a.data === 'undefined' ? '' : a.data;
    var bData = b.data === null || typeof b.data === 'undefined' ? '' : b.data;
    return (typeof aData.localeCompare === 'function' ? aData.localeCompare(bData) : aData - bData) * (order === 'asc' ? 1 : -1);
  };
}
function buildCSV(columns, data, options) {
  var _context5, _context6;
  var replaceDoubleQuoteInString = function replaceDoubleQuoteInString(columnData) {
    return typeof columnData === 'string' ? columnData.replace(/\"/g, '""') : columnData;
  };
  var buildHead = function buildHead(columns) {
    var _context;
    return _sliceInstanceProperty(_context = _reduceInstanceProperty(columns).call(columns, function (soFar, column) {
      return column.download ? soFar + '"' + escapeDangerousCSVCharacters(replaceDoubleQuoteInString(column.label || column.name)) + '"' + options.downloadOptions.separator : soFar;
    }, '')).call(_context, 0, -1) + '\r\n';
  };
  var CSVHead = buildHead(columns);
  var buildBody = function buildBody(data) {
    var _context2;
    if (!data.length) return '';
    return _trimInstanceProperty(_context2 = _reduceInstanceProperty(data).call(data, function (soFar, row) {
      var _context3, _context4;
      return soFar + '"' + _mapInstanceProperty(_context3 = _filterInstanceProperty(_context4 = row.data).call(_context4, function (_, index) {
        return columns[index].download;
      })).call(_context3, function (columnData) {
        return escapeDangerousCSVCharacters(replaceDoubleQuoteInString(columnData));
      }).join('"' + options.downloadOptions.separator + '"') + '"\r\n';
    }, '')).call(_context2);
  };
  var CSVBody = buildBody(data);
  var csv = options.onDownload ? options.onDownload(buildHead, buildBody, columns, data) : _trimInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "".concat(CSVHead)).call(_context6, CSVBody)).call(_context5);
  return csv;
}
function downloadCSV(csv, filename) {
  var blob = new Blob([csv], {
    type: 'text/csv'
  });

  /* taken from react-csv */
  if (navigator && navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var dataURI = "data:text/csv;charset=utf-8,".concat(csv);
    var URL = _URL || window.webkitURL;
    var downloadURI = typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', downloadURI);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
function createCSVDownload(columns, data, options, downloadCSV) {
  var csv = buildCSV(columns, data, options);
  if (options.onDownload && csv === false) {
    return;
  }
  downloadCSV(csv, options.downloadOptions.filename);
}

function _callSuper$6(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$6() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$6() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$6 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultBodyStyles = function defaultBodyStyles(theme) {
  return {
    root: {},
    emptyTitle: {
      textAlign: 'center'
    },
    lastStackedCell: _defineProperty({}, theme.breakpoints.down('md'), {
      '& td:last-child': {
        borderBottom: 'none'
      }
    }),
    lastSimpleCell: _defineProperty({}, theme.breakpoints.down('sm'), {
      '& td:last-child': {
        borderBottom: 'none'
      }
    })
  };
};
var TableBody = /*#__PURE__*/function (_React$Component) {
  function TableBody() {
    var _context;
    var _this;
    _classCallCheck(this, TableBody);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$6(this, TableBody, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_this, "handleRowSelect", function (data, event) {
      var shiftKey = event && event.nativeEvent ? event.nativeEvent.shiftKey : false;
      var shiftAdjacentRows = [];
      var previousSelectedRow = _this.props.previousSelectedRow;

      // If the user is pressing shift and has previously clicked another row.
      if (shiftKey && previousSelectedRow && previousSelectedRow.index < _this.props.data.length) {
        var _context2;
        var curIndex = previousSelectedRow.index;

        // Create a copy of the selectedRows object. This will be used and modified
        // below when we see if we can add adjacent rows.
        var selectedRows = cloneDeep(_this.props.selectedRows);

        // Add the clicked on row to our copy of selectedRows (if it isn't already present).
        var clickedDataIndex = _this.props.data[data.index].dataIndex;
        if (_filterInstanceProperty(_context2 = selectedRows.data).call(_context2, function (d) {
          return d.dataIndex === clickedDataIndex;
        }).length === 0) {
          selectedRows.data.push({
            index: data.index,
            dataIndex: clickedDataIndex
          });
          selectedRows.lookup[clickedDataIndex] = true;
        }
        var _loop = function _loop() {
          var dataIndex = _this.props.data[curIndex].dataIndex;
          if (_this.isRowSelectable(dataIndex, selectedRows)) {
            var _context3;
            var lookup = {
              index: curIndex,
              dataIndex: dataIndex
            };

            // Add adjacent row to temp selectedRow object if it isn't present.
            if (_filterInstanceProperty(_context3 = selectedRows.data).call(_context3, function (d) {
              return d.dataIndex === dataIndex;
            }).length === 0) {
              selectedRows.data.push(lookup);
              selectedRows.lookup[dataIndex] = true;
            }
            shiftAdjacentRows.push(lookup);
          }
          curIndex = data.index > curIndex ? curIndex + 1 : curIndex - 1;
        };
        while (curIndex !== data.index) {
          _loop();
        }
      }
      _this.props.selectRowUpdate('cell', data, shiftAdjacentRows);
    });
    _defineProperty(_this, "handleRowClick", function (row, data, event) {
      var _context4;
      // Don't trigger onRowClick if the event was actually the expandable icon.
      if (event.target.id === 'expandable-button' || event.target.nodeName === 'path' && event.target.parentNode.id === 'expandable-button') {
        return;
      }

      // Don't trigger onRowClick if the event was actually a row selection via checkbox
      if (event.target.id && _startsWithInstanceProperty(_context4 = event.target.id).call(_context4, 'MUIDataTableSelectCell')) return;

      // Check if we should toggle row select when row is clicked anywhere
      if (_this.props.options.selectableRowsOnClick && _this.props.options.selectableRows !== 'none' && _this.isRowSelectable(data.dataIndex, _this.props.selectedRows)) {
        var selectRow = {
          index: data.rowIndex,
          dataIndex: data.dataIndex
        };
        _this.handleRowSelect(selectRow, event);
      }
      // Check if we should trigger row expand when row is clicked anywhere
      if (_this.props.options.expandableRowsOnClick && _this.props.options.expandableRows && _this.isRowExpandable(data.dataIndex, _this.props.expandedRows)) {
        var expandRow = {
          index: data.rowIndex,
          dataIndex: data.dataIndex
        };
        _this.props.toggleExpandRow(expandRow);
      }

      // Don't trigger onRowClick if the event was actually a row selection via click
      if (_this.props.options.selectableRowsOnClick) return;
      _this.props.options.onRowClick && _this.props.options.onRowClick(row, data, event);
    });
    _defineProperty(_this, "processRow", function (row, columnOrder) {
      var ret = [];
      for (var ii = 0; ii < row.length; ii++) {
        ret.push({
          value: row[columnOrder[ii]],
          index: columnOrder[ii]
        });
      }
      return ret;
    });
    return _this;
  }
  _inherits(TableBody, _React$Component);
  return _createClass(TableBody, [{
    key: "buildRows",
    value: function buildRows() {
      var _this$props = this.props,
        data = _this$props.data,
        page = _this$props.page,
        rowsPerPage = _this$props.rowsPerPage,
        count = _this$props.count;
      if (this.props.options.serverSide) return data.length ? data : null;
      var rows = [];
      var highestPageInRange = getPageValue(count, rowsPerPage, page);
      var fromIndex = highestPageInRange === 0 ? 0 : highestPageInRange * rowsPerPage;
      var toIndex = Math.min(count, (highestPageInRange + 1) * rowsPerPage);
      if (page > highestPageInRange) {
        console.warn('Current page is out of range, using the highest page that is in range instead.');
      }
      for (var rowIndex = fromIndex; rowIndex < count && rowIndex < toIndex; rowIndex++) {
        if (data[rowIndex] !== undefined) rows.push(data[rowIndex]);
      }
      return rows.length ? rows : null;
    }
  }, {
    key: "getRowIndex",
    value: function getRowIndex(index) {
      var _this$props2 = this.props,
        page = _this$props2.page,
        rowsPerPage = _this$props2.rowsPerPage,
        options = _this$props2.options;
      if (options.serverSide) {
        return index;
      }
      var startIndex = page === 0 ? 0 : page * rowsPerPage;
      return startIndex + index;
    }
  }, {
    key: "isRowSelected",
    value: function isRowSelected(dataIndex) {
      var selectedRows = this.props.selectedRows;
      return selectedRows.lookup && selectedRows.lookup[dataIndex] ? true : false;
    }
  }, {
    key: "isRowExpanded",
    value: function isRowExpanded(dataIndex) {
      var expandedRows = this.props.expandedRows;
      return expandedRows.lookup && expandedRows.lookup[dataIndex] ? true : false;
    }
  }, {
    key: "isRowSelectable",
    value: function isRowSelectable(dataIndex, selectedRows) {
      var options = this.props.options;
      selectedRows = selectedRows || this.props.selectedRows;
      if (options.isRowSelectable) {
        return options.isRowSelectable(dataIndex, selectedRows);
      } else {
        return true;
      }
    }
  }, {
    key: "isRowExpandable",
    value: function isRowExpandable(dataIndex) {
      var _this$props3 = this.props,
        options = _this$props3.options,
        expandedRows = _this$props3.expandedRows;
      if (options.isRowExpandable) {
        return options.isRowExpandable(dataIndex, expandedRows);
      } else {
        return true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _context5,
        _this2 = this;
      var _this$props4 = this.props,
        classes = _this$props4.classes,
        columns = _this$props4.columns,
        toggleExpandRow = _this$props4.toggleExpandRow,
        options = _this$props4.options,
        _this$props4$columnOr = _this$props4.columnOrder,
        columnOrder = _this$props4$columnOr === void 0 ? _mapInstanceProperty(_context5 = this.props.columns).call(_context5, function (item, idx) {
          return idx;
        }) : _this$props4$columnOr,
        _this$props4$componen = _this$props4.components,
        components = _this$props4$componen === void 0 ? {} : _this$props4$componen,
        tableId = _this$props4.tableId;
      var tableRows = this.buildRows();
      var visibleColCnt = _filterInstanceProperty(columns).call(columns, function (c) {
        return c.display === 'true';
      }).length;
      return /*#__PURE__*/React.createElement(MuiTableBody, null, tableRows && tableRows.length > 0 ? _mapInstanceProperty(tableRows).call(tableRows, function (data, rowIndex) {
        var _context6, _context7, _context8, _context9;
        var row = data.data,
          dataIndex = data.dataIndex;
        if (options.customRowRender) {
          return options.customRowRender(row, dataIndex, rowIndex);
        }
        var isRowSelected = options.selectableRows !== 'none' ? _this2.isRowSelected(dataIndex) : false;
        var isRowSelectable = _this2.isRowSelectable(dataIndex);
        var bodyClasses = options.setRowProps ? options.setRowProps(row, dataIndex, rowIndex) || {} : {};
        var processedRow = _this2.processRow(row, columnOrder);
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: rowIndex
        }, /*#__PURE__*/React.createElement(TableBodyRow$1, _extends({}, bodyClasses, {
          options: options,
          rowSelected: isRowSelected,
          isRowSelectable: isRowSelectable,
          onClick: _bindInstanceProperty(_context6 = _this2.handleRowClick).call(_context6, null, row, {
            rowIndex: rowIndex,
            dataIndex: dataIndex
          }),
          className: clsx(_defineProperty(_defineProperty(_defineProperty({}, classes.lastStackedCell, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth'), classes.lastSimpleCell, options.responsive === 'simple'), bodyClasses.className, bodyClasses.className)),
          "data-testid": 'MUIDataTableBodyRow-' + dataIndex,
          id: _concatInstanceProperty(_context7 = "MUIDataTableBodyRow-".concat(tableId, "-")).call(_context7, dataIndex)
        }), /*#__PURE__*/React.createElement(TableSelectCell, {
          onChange: _bindInstanceProperty(_context8 = _this2.handleRowSelect).call(_context8, null, {
            index: _this2.getRowIndex(rowIndex),
            dataIndex: dataIndex
          }),
          onExpand: _bindInstanceProperty(toggleExpandRow).call(toggleExpandRow, null, {
            index: _this2.getRowIndex(rowIndex),
            dataIndex: dataIndex
          }),
          fixedHeader: options.fixedHeader,
          fixedSelectColumn: options.fixedSelectColumn,
          checked: isRowSelected,
          expandableOn: options.expandableRows
          // When rows are expandable, but this particular row isn't expandable, set this to true.
          // This will add a new class to the toggle button, MUIDataTableSelectCell-expandDisabled.
          ,
          hideExpandButton: !_this2.isRowExpandable(dataIndex) && options.expandableRows,
          selectableOn: options.selectableRows,
          selectableRowsHideCheckboxes: options.selectableRowsHideCheckboxes,
          isRowExpanded: _this2.isRowExpanded(dataIndex),
          isRowSelectable: isRowSelectable,
          dataIndex: dataIndex,
          id: _concatInstanceProperty(_context9 = "MUIDataTableSelectCell-".concat(tableId, "-")).call(_context9, dataIndex),
          components: components
        }), _mapInstanceProperty(processedRow).call(processedRow, function (column) {
          var _context10;
          return columns[column.index].display === 'true' && /*#__PURE__*/React.createElement(TableBodyCell, _extends({}, columns[column.index].setCellProps ? columns[column.index].setCellProps(column.value, dataIndex, column.index) || {} : {}, {
            "data-testid": _concatInstanceProperty(_context10 = "MuiDataTableBodyCell-".concat(column.index, "-")).call(_context10, rowIndex),
            dataIndex: dataIndex,
            rowIndex: rowIndex,
            colIndex: column.index,
            columnHeader: columns[column.index].label,
            print: columns[column.index].print,
            options: options,
            tableId: tableId,
            key: column.index
          }), column.value);
        })), _this2.isRowExpanded(dataIndex) && options.renderExpandableRow(row, {
          rowIndex: rowIndex,
          dataIndex: dataIndex
        }));
      }) : /*#__PURE__*/React.createElement(TableBodyRow$1, {
        options: options
      }, /*#__PURE__*/React.createElement(TableBodyCell, {
        colSpan: options.selectableRows !== 'none' || options.expandableRows ? visibleColCnt + 1 : visibleColCnt,
        options: options,
        colIndex: 0,
        rowIndex: 0
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "body1",
        className: classes.emptyTitle,
        component: 'div'
      }, options.textLabels.body.noMatch))));
    }
  }]);
}(React.Component);
_defineProperty(TableBody, "propTypes", {
  /** Data used to describe table */
  data: PropTypes.array.isRequired,
  /** Total number of data rows */
  count: PropTypes.number.isRequired,
  /** Columns used to describe table */
  columns: PropTypes.array.isRequired,
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Data used to filter table against */
  filterList: PropTypes.array,
  /** Callback to execute when row is clicked */
  onRowClick: PropTypes.func,
  /** Table rows expanded */
  expandedRows: PropTypes.object,
  /** Table rows selected */
  selectedRows: PropTypes.object,
  /** Callback to trigger table row select */
  selectRowUpdate: PropTypes.func,
  /** The most recent row to have been selected/unselected */
  previousSelectedRow: PropTypes.object,
  /** Data used to search table against */
  searchText: PropTypes.string,
  /** Toggle row expandable */
  toggleExpandRow: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object
});
_defineProperty(TableBody, "defaultProps", {
  toggleExpandRow: function toggleExpandRow() {}
});
var DefaultTableBody = mui.withStyles(TableBody, defaultBodyStyles, {
  name: 'MUIDataTableBody'
});

function _callSuper$5(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$5() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$5() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$5 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultFilterStyles = function defaultFilterStyles(theme) {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      padding: '24px 24px 36px 24px',
      fontFamily: 'Roboto'
    },
    header: {
      flex: '0 0 auto',
      marginBottom: '16px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      display: 'inline-block',
      marginLeft: '7px',
      color: theme.palette.text.primary,
      fontSize: '14px',
      fontWeight: 500
    },
    noMargin: {
      marginLeft: '0px'
    },
    reset: {
      alignSelf: 'left'
    },
    resetLink: {
      marginLeft: '16px',
      fontSize: '12px',
      cursor: 'pointer'
    },
    filtersSelected: {
      alignSelf: 'right'
    },
    /* checkbox */
    checkboxListTitle: {
      marginLeft: '7px',
      marginBottom: '8px',
      fontSize: '14px',
      color: theme.palette.text.secondary,
      textAlign: 'left',
      fontWeight: 500
    },
    checkboxFormGroup: {
      marginTop: '8px'
    },
    checkboxFormControl: {
      margin: '0px'
    },
    checkboxFormControlLabel: {
      fontSize: '15px',
      marginLeft: '8px',
      color: theme.palette.text.primary
    },
    checkboxIcon: {
      width: '32px',
      height: '32px'
    },
    checkbox: {},
    checked: {},
    gridListTile: {
      marginTop: '16px'
    }
  };
};
var TableFilter = /*#__PURE__*/function (_React$Component) {
  function TableFilter(props) {
    var _this;
    _classCallCheck(this, TableFilter);
    _this = _callSuper$5(this, TableFilter, [props]);
    _defineProperty(_this, "filterUpdate", function (index, value, column, type, customUpdate) {
      var _context;
      var newFilterList = _sliceInstanceProperty(_context = _this.state.filterList).call(_context, 0);
      _this.props.updateFilterByType(newFilterList, index, value, type, customUpdate);
      _this.setState({
        filterList: newFilterList
      });
    });
    _defineProperty(_this, "handleCheckboxChange", function (index, value, column) {
      _this.filterUpdate(index, value, column, 'checkbox');
      if (_this.props.options.confirmFilters !== true) {
        _this.props.onFilterUpdate(index, value, column, 'checkbox');
      }
    });
    _defineProperty(_this, "handleDropdownChange", function (event, index, column) {
      var labelFilterAll = _filterInstanceProperty(_this.props.options.textLabels).all;
      var value = event.target.value === labelFilterAll ? [] : [event.target.value];
      _this.filterUpdate(index, value, column, 'dropdown');
      if (_this.props.options.confirmFilters !== true) {
        _this.props.onFilterUpdate(index, value, column, 'dropdown');
      }
    });
    _defineProperty(_this, "handleMultiselectChange", function (index, value, column) {
      _this.filterUpdate(index, value, column, 'multiselect');
      if (_this.props.options.confirmFilters !== true) {
        _this.props.onFilterUpdate(index, value, column, 'multiselect');
      }
    });
    _defineProperty(_this, "handleTextFieldChange", function (event, index, column) {
      _this.filterUpdate(index, event.target.value, column, 'textField');
      if (_this.props.options.confirmFilters !== true) {
        _this.props.onFilterUpdate(index, event.target.value, column, 'textField');
      }
    });
    _defineProperty(_this, "handleCustomChange", function (value, index, column) {
      _this.filterUpdate(index, value, column.name, column.filterType);
      if (_this.props.options.confirmFilters !== true) {
        _this.props.onFilterUpdate(index, value, column.name, column.filterType);
      }
    });
    _defineProperty(_this, "applyFilters", function () {
      var _context2;
      _forEachInstanceProperty(_context2 = _this.state.filterList).call(_context2, function (filter, index) {
        _this.props.onFilterUpdate(index, filter, _this.props.columns[index], 'custom');
      });
      _this.props.handleClose(); // close filter dialog popover

      if (_this.props.options.onFilterConfirm) {
        _this.props.options.onFilterConfirm(_this.state.filterList);
      }
      return _this.state.filterList;
    });
    _defineProperty(_this, "resetFilters", function () {
      var _context3;
      _this.setState({
        filterList: _mapInstanceProperty(_context3 = _this.props.columns).call(_context3, function () {
          return [];
        })
      });
      if (_this.props.options.confirmFilters !== true) {
        _this.props.onFilterReset();
      }
    });
    _this.state = {
      filterList: cloneDeep(props.filterList)
    };
    return _this;
  }
  _inherits(TableFilter, _React$Component);
  return _createClass(TableFilter, [{
    key: "renderCheckbox",
    value: function renderCheckbox(column, index) {
      var _context4,
        _this2 = this;
      var components = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var CheckboxComponent = components.Checkbox || Checkbox;
      var _this$props = this.props,
        classes = _this$props.classes,
        filterData = _this$props.filterData;
      var filterList = this.state.filterList;
      var renderItem = column.filterOptions && column.filterOptions.renderValue ? column.filterOptions.renderValue : function (v) {
        return v;
      };
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        key: index,
        xs: 6
      }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "body2",
        className: classes.checkboxListTitle
      }, column.label)), /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, _mapInstanceProperty(_context4 = filterData[index]).call(_context4, function (filterValue, filterIndex) {
        var _context5, _context6;
        return /*#__PURE__*/React.createElement(Grid, {
          item: true,
          key: filterIndex
        }, /*#__PURE__*/React.createElement(FormControlLabel, {
          key: filterIndex,
          classes: {
            root: classes.checkboxFormControl,
            label: classes.checkboxFormControlLabel
          },
          control: /*#__PURE__*/React.createElement(CheckboxComponent, {
            "data-description": "table-filter",
            color: "primary",
            className: classes.checkboxIcon,
            onChange: _bindInstanceProperty(_context5 = _this2.handleCheckboxChange).call(_context5, null, index, filterValue, column.name),
            checked: _indexOfInstanceProperty(_context6 = filterList[index]).call(_context6, filterValue) >= 0,
            classes: {
              root: classes.checkbox,
              checked: classes.checked
            },
            value: filterValue != null ? filterValue.toString() : ''
          }),
          label: renderItem(filterValue)
        }));
      }))));
    }
  }, {
    key: "renderSelect",
    value: function renderSelect(column, index) {
      var _this3 = this,
        _context7;
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        filterData = _this$props2.filterData,
        options = _this$props2.options;
      var filterList = this.state.filterList;
      var textLabels = _filterInstanceProperty(options.textLabels);
      var renderItem = column.filterOptions && column.filterOptions.renderValue ? column.filterOptions.renderValue : function (v) {
        return v != null ? v.toString() : '';
      };
      var width = (column.filterOptions && column.filterOptions.fullWidth) === true ? 12 : 6;
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        key: index,
        xs: width,
        classes: {
          'grid-xs-12': classes.gridListTile,
          'grid-xs-6': classes.gridListTile
        }
      }, /*#__PURE__*/React.createElement(FormControl, {
        key: index,
        variant: 'standard',
        fullWidth: true
      }, /*#__PURE__*/React.createElement(InputLabel, {
        htmlFor: column.name
      }, column.label), /*#__PURE__*/React.createElement(Select, {
        fullWidth: true,
        value: filterList[index].length ? filterList[index].toString() : textLabels.all,
        name: column.name,
        onChange: function onChange(event) {
          return _this3.handleDropdownChange(event, index, column.name);
        },
        input: /*#__PURE__*/React.createElement(Input, {
          name: column.name,
          id: column.name
        })
      }, /*#__PURE__*/React.createElement(MenuItem, {
        value: textLabels.all,
        key: 0
      }, textLabels.all), _mapInstanceProperty(_context7 = filterData[index]).call(_context7, function (filterValue, filterIndex) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          value: filterValue,
          key: filterIndex + 1
        }, renderItem(filterValue));
      }))));
    }
  }, {
    key: "renderTextField",
    value: function renderTextField(column, index) {
      var _this4 = this;
      var classes = this.props.classes;
      var filterList = this.state.filterList;
      if (column.filterOptions && column.filterOptions.renderValue) {
        console.warn('Custom renderValue not supported for textField filters');
      }
      var width = (column.filterOptions && column.filterOptions.fullWidth) === true ? 12 : 6;
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        key: index,
        xs: width,
        classes: {
          'grid-xs-12': classes.gridListTile,
          'grid-xs-6': classes.gridListTile
        }
      }, /*#__PURE__*/React.createElement(FormControl, {
        key: index,
        fullWidth: true
      }, /*#__PURE__*/React.createElement(TextField, {
        fullWidth: true,
        variant: 'standard',
        label: column.label,
        value: filterList[index].toString() || '',
        "data-testid": 'filtertextfield-' + column.name,
        onChange: function onChange(event) {
          return _this4.handleTextFieldChange(event, index, column.name);
        }
      })));
    }
  }, {
    key: "renderMultiselect",
    value: function renderMultiselect(column, index) {
      var _this5 = this,
        _context8;
      var components = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var CheckboxComponent = components.Checkbox || Checkbox;
      var _this$props3 = this.props,
        classes = _this$props3.classes,
        filterData = _this$props3.filterData;
      var filterList = this.state.filterList;
      var renderItem = column.filterOptions && column.filterOptions.renderValue ? column.filterOptions.renderValue : function (v) {
        return v;
      };
      var width = (column.filterOptions && column.filterOptions.fullWidth) === true ? 12 : 6;
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        key: index,
        xs: width,
        classes: {
          'grid-xs-12': classes.gridListTile,
          'grid-xs-6': classes.gridListTile
        }
      }, /*#__PURE__*/React.createElement(FormControl, {
        key: index,
        variant: 'standard',
        fullWidth: true
      }, /*#__PURE__*/React.createElement(InputLabel, {
        htmlFor: column.name
      }, column.label), /*#__PURE__*/React.createElement(Select, {
        multiple: true,
        fullWidth: true,
        value: filterList[index] || [],
        renderValue: function renderValue(selected) {
          return _mapInstanceProperty(selected).call(selected, renderItem).join(', ');
        },
        name: column.name,
        onChange: function onChange(event) {
          return _this5.handleMultiselectChange(index, event.target.value, column.name);
        },
        input: /*#__PURE__*/React.createElement(Input, {
          name: column.name,
          id: column.name
        })
      }, _mapInstanceProperty(_context8 = filterData[index]).call(_context8, function (filterValue, filterIndex) {
        var _context9;
        return /*#__PURE__*/React.createElement(MenuItem, {
          value: filterValue,
          key: filterIndex + 1
        }, /*#__PURE__*/React.createElement(CheckboxComponent, {
          "data-description": "table-filter",
          color: "primary",
          checked: _indexOfInstanceProperty(_context9 = filterList[index]).call(_context9, filterValue) >= 0,
          value: filterValue != null ? filterValue.toString() : '',
          className: classes.checkboxIcon,
          classes: {
            root: classes.checkbox,
            checked: classes.checked
          }
        }), /*#__PURE__*/React.createElement(ListItemText, {
          primary: renderItem(filterValue)
        }));
      }))));
    }
  }, {
    key: "renderCustomField",
    value: function renderCustomField(column, index) {
      var _this$props4 = this.props,
        classes = _this$props4.classes,
        filterData = _this$props4.filterData,
        options = _this$props4.options;
      var filterList = this.state.filterList;
      var width = (column.filterOptions && column.filterOptions.fullWidth) === true ? 12 : 6;
      var display = column.filterOptions && column.filterOptions.display || options.filterOptions && options.filterOptions.display;
      if (!display) {
        console.error('Property "display" is required when using custom filter type.');
        return;
      }
      if (column.filterListOptions && column.filterListOptions.renderValue) {
        console.warning('"renderValue" is ignored for custom filter fields');
      }
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        key: index,
        xs: width,
        classes: {
          'grid-xs-12': classes.gridListTile,
          'grid-xs-6': classes.gridListTile
        }
      }, /*#__PURE__*/React.createElement(FormControl, {
        key: index,
        fullWidth: true
      }, display(filterList, this.handleCustomChange, index, column, filterData)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;
      var _this$props5 = this.props,
        classes = _this$props5.classes,
        columns = _this$props5.columns,
        options = _this$props5.options,
        customFooter = _this$props5.customFooter,
        filterList = _this$props5.filterList,
        _this$props5$componen = _this$props5.components,
        components = _this$props5$componen === void 0 ? {} : _this$props5$componen;
      var textLabels = _filterInstanceProperty(options.textLabels);
      return /*#__PURE__*/React.createElement("div", {
        className: classes.root
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.header
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.reset
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "body2",
        className: clsx(_defineProperty({}, classes.title, true))
      }, textLabels.title), /*#__PURE__*/React.createElement(Button, {
        color: "primary",
        className: classes.resetLink,
        tabIndex: 0,
        "aria-label": textLabels.reset,
        "data-testid": 'filterReset-button',
        onClick: this.resetFilters
      }, textLabels.reset)), /*#__PURE__*/React.createElement("div", {
        className: classes.filtersSelected
      })), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        direction: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        spacing: 4
      }, _mapInstanceProperty(columns).call(columns, function (column, index) {
        if (_filterInstanceProperty(column)) {
          var filterType = column.filterType || options.filterType;
          return filterType === 'checkbox' ? _this6.renderCheckbox(column, index, components) : filterType === 'multiselect' ? _this6.renderMultiselect(column, index, components) : filterType === 'textField' ? _this6.renderTextField(column, index) : filterType === 'custom' ? _this6.renderCustomField(column, index) : _this6.renderSelect(column, index);
        }
      })), customFooter ? customFooter(filterList, this.applyFilters) : '');
    }
  }]);
}(React.Component);
_defineProperty(TableFilter, "propTypes", {
  /** Data used to populate filter dropdown/checkbox */
  filterData: PropTypes.array.isRequired,
  /** Data selected to be filtered against dropdown/checkbox */
  filterList: PropTypes.array.isRequired,
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Callback to trigger filter update */
  onFilterUpdate: PropTypes.func,
  /** Callback to trigger filter reset */
  onFilterReset: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object
});
var DefaultTableFilter = mui.withStyles(TableFilter, defaultFilterStyles, {
  name: 'MUIDataTableFilter'
});

var TableFilterListItem = function TableFilterListItem(_ref) {
  var label = _ref.label,
    onDelete = _ref.onDelete,
    className = _ref.className,
    filterProps = _ref.filterProps;
  filterProps = filterProps || {};
  if (filterProps.className) {
    className = clsx(className, filterProps.className);
  }
  return /*#__PURE__*/React.createElement(Chip, _extends({
    label: label,
    onDelete: onDelete,
    className: className
  }, filterProps));
};
TableFilterListItem.propTypes = {
  label: PropTypes.node,
  onDelete: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

var useStyles$8 = mui.makeStyles({
  name: 'MUIDataTableFilterList'
})(function () {
  return {
    root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      margin: '0px 16px 0px 16px'
    },
    chip: {
      margin: '8px 8px 0px 0px'
    }
  };
});
var TableFilterList = function TableFilterList(_ref) {
  var options = _ref.options,
    filterList = _ref.filterList,
    filterUpdate = _ref.filterUpdate,
    filterListRenderers = _ref.filterListRenderers,
    columnNames = _ref.columnNames,
    serverSideFilterList = _ref.serverSideFilterList,
    customFilterListUpdate = _ref.customFilterListUpdate,
    _ref$ItemComponent = _ref.ItemComponent,
    ItemComponent = _ref$ItemComponent === void 0 ? TableFilterListItem : _ref$ItemComponent;
  var _useStyles = useStyles$8(),
    classes = _useStyles.classes;
  var serverSide = options.serverSide;
  var removeFilter = function removeFilter(index, filterValue, columnName, filterType) {
    var customFilterListUpdate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var removedFilter = filterValue;
    if (_Array$isArray(removedFilter) && removedFilter.length === 0) {
      removedFilter = filterList[index];
    }
    filterUpdate(index, filterValue, columnName, filterType, customFilterListUpdate, function (filterList) {
      if (options.onFilterChipClose) {
        options.onFilterChipClose(index, removedFilter, filterList);
      }
    });
  };
  var customFilterChip = function customFilterChip(customFilterItem, index, customFilterItemIndex, item, isArray) {
    var type;
    // If our custom filter list is an array, we need to check for custom update functions to determine
    // default type. Otherwise we use the supplied type in options.
    if (isArray) {
      type = customFilterListUpdate[index] ? 'custom' : 'chip';
    } else {
      type = columnNames[index].filterType;
    }
    return /*#__PURE__*/React.createElement(ItemComponent, {
      label: customFilterItem,
      key: customFilterItemIndex,
      onDelete: function onDelete() {
        return removeFilter(index, item[customFilterItemIndex] || [], columnNames[index].name, type, customFilterListUpdate[index]);
      },
      className: classes.chip,
      itemKey: customFilterItemIndex,
      index: index,
      data: item,
      columnNames: columnNames,
      filterProps: options.setFilterChipProps ? options.setFilterChipProps(index, columnNames[index].name, item[customFilterItemIndex] || []) : {}
    });
  };
  var filterChip = function filterChip(index, data, colIndex) {
    return /*#__PURE__*/React.createElement(ItemComponent, {
      label: filterListRenderers[index](data),
      key: colIndex,
      onDelete: function onDelete() {
        return removeFilter(index, data, columnNames[index].name, 'chip');
      },
      className: classes.chip,
      itemKey: colIndex,
      index: index,
      data: data,
      columnNames: columnNames,
      filterProps: options.setFilterChipProps ? options.setFilterChipProps(index, columnNames[index].name, data) : {}
    });
  };
  var getFilterList = function getFilterList(filterList) {
    return _mapInstanceProperty(filterList).call(filterList, function (item, index) {
      if (columnNames[index].filterType === 'custom' && filterList[index].length) {
        var filterListRenderersValue = filterListRenderers[index](item);
        if (_Array$isArray(filterListRenderersValue)) {
          return _mapInstanceProperty(filterListRenderersValue).call(filterListRenderersValue, function (customFilterItem, customFilterItemIndex) {
            return customFilterChip(customFilterItem, index, customFilterItemIndex, item, true);
          });
        } else {
          return customFilterChip(filterListRenderersValue, index, index, item, false);
        }
      }
      return _mapInstanceProperty(item).call(item, function (data, colIndex) {
        return filterChip(index, data, colIndex);
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, serverSide && serverSideFilterList ? getFilterList(serverSideFilterList) : getFilterList(filterList));
};
TableFilterList.propTypes = {
  /** Data used to filter table against */
  filterList: PropTypes.array.isRequired,
  /** Filter List value renderers */
  filterListRenderers: PropTypes.array.isRequired,
  /** Columns used to describe table */
  columnNames: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    name: PropTypes.string.isRequired,
    filterType: PropTypes.string
  })])).isRequired,
  /** Callback to trigger filter update */
  onFilterUpdate: PropTypes.func,
  ItemComponent: PropTypes.any
};

var useStyles$7 = mui.makeStyles({
  name: 'MUIDataTableJumpToPage'
})(function (theme) {
  return {
    root: {
      color: theme.palette.text.primary
    },
    caption: {
      flexShrink: 0
    },
    /*  Styles applied to the Select component root element */
    selectRoot: {
      marginRight: 32,
      marginLeft: 8
    },
    select: {
      paddingTop: 6,
      paddingBottom: 7,
      paddingLeft: 8,
      paddingRight: 24,
      textAlign: 'right',
      textAlignLast: 'right',
      fontSize: theme.typography.pxToRem(14)
    },
    /* Styles applied to Select component icon class */
    selectIcon: {},
    /* Styles applied to InputBase component */
    input: {
      color: 'inhert',
      fontSize: 'inhert',
      flexShrink: 0
    }
  };
});
function JumpToPage(props) {
  var _useStyles = useStyles$7(),
    classes = _useStyles.classes;
  var handlePageChange = function handlePageChange(event) {
    props.changePage(_parseInt(event.target.value, 10));
  };
  var count = props.count,
    textLabels = props.textLabels,
    rowsPerPage = props.rowsPerPage,
    page = props.page;
    props.changePage;
  var textLabel = textLabels.pagination.jumpToPage;
  var pages = [];
  var lastPage = Math.min(1000, getPageValue(count, rowsPerPage, 1000000));
  for (var ii = 0; ii <= lastPage; ii++) {
    pages.push(ii);
  }
  var MenuItemComponent = MenuItem;
  var myStyle = {
    display: 'flex',
    minHeight: '52px',
    alignItems: 'center'
  };
  return /*#__PURE__*/React.createElement(Toolbar, {
    style: myStyle,
    className: classes.root
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "inherit",
    variant: "body2",
    className: classes.caption
  }, textLabel), /*#__PURE__*/React.createElement(Select, {
    classes: {
      select: classes.select,
      icon: classes.selectIcon
    },
    input: /*#__PURE__*/React.createElement(InputBase, {
      className: clsx(classes.input, classes.selectRoot)
    }),
    value: getPageValue(count, rowsPerPage, page),
    onChange: handlePageChange,
    style: {
      marginRight: 0
    }
  }, _mapInstanceProperty(pages).call(pages, function (pageVal) {
    return /*#__PURE__*/React.createElement(MenuItemComponent, {
      className: classes.menuItem,
      key: pageVal,
      value: pageVal
    }, pageVal + 1);
  })));
}
JumpToPage.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  textLabels: PropTypes.object.isRequired
};

var useStyles$6 = mui.makeStyles({ name: 'MUIDataTablePagination' })(function () { return ({
    root: {},
    navContainer: {
        padding: '0px 24px 0px 24px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    toolbar: {},
    selectRoot: {},
    '@media screen and (max-width: 400px)': {
        toolbar: {
            '& span:nth-of-type(2)': {
                display: 'none',
            },
        },
        selectRoot: {
            marginRight: '8px',
        },
    },
}); });
function TablePagination(props) {
    var classes = useStyles$6().classes;
    var handleRowChange = function (event) {
        props.changeRowsPerPage(event.target.value);
    };
    var handlePageChange = function (_, page) {
        props.changePage(page);
    };
    var count = props.count, options = props.options, rowsPerPage = props.rowsPerPage, page = props.page;
    var textLabels = options.textLabels.pagination;
    return (jsxRuntime.jsxs("div", { className: classes.navContainer, children: [options.jumpToPage ? (jsxRuntime.jsx(JumpToPage, { count: count, page: page, rowsPerPage: rowsPerPage, textLabels: options.textLabels, changePage: props.changePage, changeRowsPerPage: props.changeRowsPerPage })) : null, jsxRuntime.jsx(MuiTablePagination, { component: "div", className: classes.root, classes: {
                    // @ts-expect-error - MUI TablePagination component is not typed
                    caption: classes.caption,
                    toolbar: classes.toolbar,
                    selectRoot: classes.selectRoot,
                }, count: count, rowsPerPage: rowsPerPage, page: getPageValue(count, rowsPerPage, page), labelRowsPerPage: textLabels.rowsPerPage, labelDisplayedRows: function (_a) {
                    var from = _a.from, to = _a.to, count = _a.count;
                    return "".concat(from, "-").concat(to, " ").concat(textLabels.displayRows, " ").concat(count);
                }, backIconButtonProps: {
                    id: 'pagination-back',
                    'data-testid': 'pagination-back',
                    'aria-label': textLabels.previous,
                    title: textLabels.previous || '',
                }, nextIconButtonProps: {
                    id: 'pagination-next',
                    'data-testid': 'pagination-next',
                    'aria-label': textLabels.next,
                    title: textLabels.next || '',
                }, SelectProps: {
                    id: 'pagination-input',
                    SelectDisplayProps: { id: 'pagination-rows', 'data-testid': 'pagination-rows' },
                    MenuProps: {
                        id: 'pagination-menu',
                        'data-testid': 'pagination-menu',
                        MenuListProps: { id: 'pagination-menu-list', 'data-testid': 'pagination-menu-list' },
                    },
                }, rowsPerPageOptions: options.rowsPerPageOptions, onPageChange: handlePageChange, onRowsPerPageChange: handleRowChange })] }));
}

var useStyles$5 = mui.makeStyles({
  name: 'MUIDataTableFooter'
})(function () {
  return {
    root: {
      '@media print': {
        display: 'none'
      }
    }
  };
});
var TableFooter = function TableFooter(_ref) {
  var options = _ref.options,
    rowCount = _ref.rowCount,
    page = _ref.page,
    rowsPerPage = _ref.rowsPerPage,
    changeRowsPerPage = _ref.changeRowsPerPage,
    changePage = _ref.changePage;
  var _useStyles = useStyles$5(),
    classes = _useStyles.classes;
  var customFooter = options.customFooter,
    _options$pagination = options.pagination,
    pagination = _options$pagination === void 0 ? true : _options$pagination;
  if (customFooter) {
    return options.customFooter(rowCount, page, rowsPerPage, changeRowsPerPage, changePage, options.textLabels.pagination);
  }
  if (pagination) {
    return /*#__PURE__*/React.createElement(TablePagination, {
      className: classes.root,
      count: rowCount,
      page: page,
      rowsPerPage: rowsPerPage,
      changeRowsPerPage: changeRowsPerPage,
      changePage: changePage,
      component: 'div',
      options: options
    });
  }
  return null;
};
TableFooter.propTypes = {
  /** Total number of table rows */
  rowCount: PropTypes.number.isRequired,
  /** Options used to describe table */
  options: PropTypes.shape({
    customFooter: PropTypes.func,
    pagination: PropTypes.bool,
    textLabels: PropTypes.shape({
      pagination: PropTypes.object
    })
  }),
  /** Current page index */
  page: PropTypes.number.isRequired,
  /** Total number allowed of rows per page */
  rowsPerPage: PropTypes.number.isRequired,
  /** Callback to trigger rows per page change */
  changeRowsPerPage: PropTypes.func.isRequired,
  /** Callback to trigger page change */
  changePage: PropTypes.func.isRequired
};

var getColModel = function getColModel(headCellRefs, columnOrder, columns) {
  var colModel = [];
  var leftMostCell = headCellRefs[0] ? headCellRefs[0] : null; // left most cell is the select cell, if it exists

  if (leftMostCell === null) {
    leftMostCell = {
      offsetLeft: Infinity
    };
    var headCells = _Object$entries(headCellRefs);
    _forEachInstanceProperty(headCells).call(headCells, function (_ref, idx) {
      var _ref2 = _slicedToArray(_ref, 2);
        _ref2[0];
        var item = _ref2[1];
      if (item && item.offsetLeft < leftMostCell.offsetLeft) {
        leftMostCell = item;
      }
    });
    if (leftMostCell.offsetLeft === Infinity) {
      leftMostCell = {
        offsetParent: 0,
        offsetWidth: 0,
        offsetLeft: 0
      };
    }
  }
  var ii = 0,
    parentOffsetLeft = 0,
    offsetParent = leftMostCell.offsetParent;
  while (offsetParent) {
    parentOffsetLeft = parentOffsetLeft + (offsetParent.offsetLeft || 0) - (offsetParent.scrollLeft || 0);
    offsetParent = offsetParent.offsetParent;
    ii++;
    if (ii > 1000) break;
  }

  // if the select cell is present, make sure it is apart of the column model
  if (headCellRefs[0]) {
    colModel[0] = {
      left: parentOffsetLeft + leftMostCell.offsetLeft,
      width: leftMostCell.offsetWidth,
      columnIndex: null,
      ref: leftMostCell
    };
  }
  _forEachInstanceProperty(columnOrder).call(columnOrder, function (colIdx, idx) {
    var col = headCellRefs[colIdx + 1];
    var cmIndx = colModel.length - 1;
    if (!(columns[colIdx] && columns[colIdx].display !== 'true')) {
      var prevLeft = cmIndx !== -1 ? colModel[cmIndx].left + colModel[cmIndx].width : parentOffsetLeft + leftMostCell.offsetLeft;
      colModel.push({
        left: prevLeft,
        width: col.offsetWidth,
        columnIndex: colIdx,
        ref: col
      });
    }
  });
  return colModel;
};
var reorderColumns = function reorderColumns(prevColumnOrder, columnIndex, newPosition) {
  var columnOrder = _sliceInstanceProperty(prevColumnOrder).call(prevColumnOrder);
  var srcIndex = _indexOfInstanceProperty(columnOrder).call(columnOrder, columnIndex);
  var targetIndex = _indexOfInstanceProperty(columnOrder).call(columnOrder, newPosition);
  if (srcIndex !== -1 && targetIndex !== -1) {
    var _context, _context2;
    var newItem = columnOrder[srcIndex];
    columnOrder = _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(_sliceInstanceProperty(columnOrder).call(columnOrder, 0, srcIndex)), _toConsumableArray(_sliceInstanceProperty(columnOrder).call(columnOrder, srcIndex + 1)));
    columnOrder = _concatInstanceProperty(_context2 = []).call(_context2, _toConsumableArray(_sliceInstanceProperty(columnOrder).call(columnOrder, 0, targetIndex)), [newItem], _toConsumableArray(_sliceInstanceProperty(columnOrder).call(columnOrder, targetIndex)));
  }
  return columnOrder;
};
var handleHover = function handleHover(opts) {
  opts.item;
    var mon = opts.mon,
    index = opts.index,
    headCellRefs = opts.headCellRefs,
    updateColumnOrder = opts.updateColumnOrder,
    columnOrder = opts.columnOrder,
    _opts$transitionTime = opts.transitionTime,
    transitionTime = _opts$transitionTime === void 0 ? 300 : _opts$transitionTime,
    tableRef = opts.tableRef,
    tableId = opts.tableId,
    timers = opts.timers,
    columns = opts.columns;
  var hoverIdx = mon.getItem().colIndex;
  if (headCellRefs !== mon.getItem().headCellRefs) return;
  if (hoverIdx !== index) {
    var reorderedCols = reorderColumns(columnOrder, mon.getItem().colIndex, index);
    var newColModel = getColModel(headCellRefs, reorderedCols, columns);
    var newX = mon.getClientOffset().x;
    var modelIdx = -1;
    for (var ii = 0; ii < newColModel.length; ii++) {
      if (newX > newColModel[ii].left && newX < newColModel[ii].left + newColModel[ii].width) {
        modelIdx = newColModel[ii].columnIndex;
        break;
      }
    }
    if (modelIdx === mon.getItem().colIndex) {
      clearTimeout(timers.columnShift);
      var curColModel = getColModel(headCellRefs, columnOrder, columns);
      var transitions = [];
      _forEachInstanceProperty(newColModel).call(newColModel, function (item) {
        transitions[item.columnIndex] = item.left;
      });
      _forEachInstanceProperty(curColModel).call(curColModel, function (item) {
        transitions[item.columnIndex] = transitions[item.columnIndex] - item.left;
      });
      for (var idx = 1; idx < columnOrder.length; idx++) {
        var colIndex = columnOrder[idx];
        if (columns[colIndex] && columns[colIndex].display !== 'true') ; else {
          if (headCellRefs[idx]) headCellRefs[idx].style.transition = '280ms';
          if (headCellRefs[idx]) headCellRefs[idx].style.transform = 'translateX(' + transitions[idx - 1] + 'px)';
        }
      }
      var allElms = [];
      var dividers = [];
      for (var _ii = 0; _ii < columnOrder.length; _ii++) {
        var elms = tableRef ? tableRef.querySelectorAll('[data-colindex="' + _ii + '"][data-tableid="' + tableId + '"]') : [];
        for (var jj = 0; jj < elms.length; jj++) {
          elms[jj].style.transition = transitionTime + 'ms';
          elms[jj].style.transform = 'translateX(' + transitions[_ii] + 'px)';
          allElms.push(elms[jj]);
        }
        var divider = tableRef ? tableRef.querySelectorAll('[data-divider-index="' + (_ii + 1) + '"][data-tableid="' + tableId + '"]') : [];
        for (var _jj = 0; _jj < divider.length; _jj++) {
          divider[_jj].style.transition = transitionTime + 'ms';
          divider[_jj].style.transform = 'translateX(' + transitions[columnOrder[_ii]] + 'px)';
          dividers.push(divider[_jj]);
        }
      }
      var newColIndex = mon.getItem().colIndex;
      timers.columnShift = _setTimeout(function () {
        _forEachInstanceProperty(allElms).call(allElms, function (item) {
          item.style.transition = '0s';
          item.style.transform = 'translateX(0)';
        });
        _forEachInstanceProperty(dividers).call(dividers, function (item) {
          item.style.transition = '0s';
          item.style.transform = 'translateX(0)';
        });
        updateColumnOrder(reorderedCols, newColIndex, index);
      }, transitionTime);
    }
  }
};
var useColumnDrop = function useColumnDrop(opts) {
  var _useDrop = reactDnd.useDrop({
      accept: 'HEADER',
      drop: drop,
      hover: function hover(item, mon) {
        return handleHover(_Object$assign({}, opts, {
          item: item,
          mon: mon
        }));
      },
      collect: function collect(mon) {
        return {
          isOver: !!mon.isOver(),
          canDrop: !!mon.canDrop()
        };
      }
    }),
    _useDrop2 = _slicedToArray(_useDrop, 2),
    _useDrop2$ = _useDrop2[0];
    _useDrop2$.isOver;
    _useDrop2$.canDrop;
    var drop = _useDrop2[1];
  return [drop];
};

var _excluded$3 = ["className"];
function ownKeys$3(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys$3(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys$3(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var useStyles$4 = mui.makeStyles({
  name: 'MUIDataTableHeadCell'
})(function (theme) {
  return {
    root: {},
    fixedHeader: {
      position: 'sticky',
      top: '0px',
      zIndex: 100,
      backgroundColor: theme.palette.background.paper
    },
    tooltip: {
      cursor: 'pointer'
    },
    mypopper: {
      '&[data-x-out-of-boundaries]': {
        display: 'none'
      }
    },
    data: {
      display: 'inline-block'
    },
    sortAction: {
      display: 'flex',
      cursor: 'pointer'
    },
    dragCursor: {
      cursor: 'grab'
    },
    sortLabelRoot: {
      height: '20px'
    },
    sortActive: {
      color: theme.palette.text.primary
    },
    toolButton: {
      textTransform: 'none',
      marginLeft: '-8px',
      minWidth: 0,
      marginRight: '8px',
      paddingLeft: '8px',
      paddingRight: '8px'
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    hintIconAlone: {
      marginTop: '-3px',
      marginLeft: '3px'
    },
    hintIconWithSortIcon: {
      marginTop: '-3px'
    }
  };
});
var TableHeadCell = function TableHeadCell(_ref) {
  var _ref$cellHeaderProps = _ref.cellHeaderProps,
    cellHeaderProps = _ref$cellHeaderProps === void 0 ? {} : _ref$cellHeaderProps,
    children = _ref.children,
    colPosition = _ref.colPosition,
    column = _ref.column,
    columns = _ref.columns,
    _ref$columnOrder = _ref.columnOrder,
    columnOrder = _ref$columnOrder === void 0 ? [] : _ref$columnOrder,
    _ref$components = _ref.components,
    components = _ref$components === void 0 ? {} : _ref$components,
    draggableHeadCellRefs = _ref.draggableHeadCellRefs,
    draggingHook = _ref.draggingHook,
    hint = _ref.hint,
    index = _ref.index,
    options = _ref.options,
    print = _ref.print,
    setCellRef = _ref.setCellRef,
    sort = _sortInstanceProperty(_ref),
    sortDirection = _ref.sortDirection,
    tableRef = _ref.tableRef,
    tableId = _ref.tableId,
    timers = _ref.timers,
    toggleSort = _ref.toggleSort,
    updateColumnOrder = _ref.updateColumnOrder;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sortTooltipOpen = _useState2[0],
    setSortTooltipOpen = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    hintTooltipOpen = _useState4[0],
    setHintTooltipOpen = _useState4[1];
  var _useStyles = useStyles$4(),
    classes = _useStyles.classes;
  var handleKeyboardSortInput = function handleKeyboardSortInput(e) {
    if (e.key === 'Enter') {
      toggleSort(index);
    }
    return false;
  };
  var handleSortClick = function handleSortClick() {
    toggleSort(index);
  };
  var _ref2 = draggingHook ? draggingHook : [],
    _ref3 = _slicedToArray(_ref2, 2),
    dragging = _ref3[0],
    setDragging = _ref3[1];
  var className = cellHeaderProps.className,
    otherProps = _objectWithoutProperties(cellHeaderProps, _excluded$3);
  var Tooltip = components.Tooltip || MuiTooltip;
  var sortActive = sortDirection !== 'none' && sortDirection !== undefined;
  var ariaSortDirection = sortDirection === 'none' ? false : sortDirection;
  var isDraggingEnabled = function isDraggingEnabled() {
    if (!draggingHook) return false;
    return options.draggableColumns && options.draggableColumns.enabled && column.draggable !== false;
  };
  var sortLabelProps = _objectSpread$3({
    classes: {
      root: classes.sortLabelRoot
    },
    tabIndex: -1,
    active: sortActive,
    hideSortIcon: true
  }, ariaSortDirection ? {
    direction: sortDirection
  } : {});
  var _useDrag = reactDnd.useDrag({
      item: {
        type: 'HEADER',
        colIndex: index,
        headCellRefs: draggableHeadCellRefs
      },
      begin: function begin(monitor) {
        _setTimeout(function () {
          setHintTooltipOpen(false);
          setSortTooltipOpen(false);
          setDragging(true);
        }, 0);
        return null;
      },
      end: function end(item, monitor) {
        setDragging(false);
      },
      collect: function collect(monitor) {
        return {
          opacity: monitor.isDragging() ? 1 : 0
        };
      }
    }),
    _useDrag2 = _slicedToArray(_useDrag, 3);
    _useDrag2[0].opacity;
    var dragRef = _useDrag2[1];
    _useDrag2[2];
  var _useColumnDrop = useColumnDrop({
      drop: function drop(item, mon) {
        setSortTooltipOpen(false);
        setHintTooltipOpen(false);
        setDragging(false);
      },
      index: index,
      headCellRefs: draggableHeadCellRefs,
      updateColumnOrder: updateColumnOrder,
      columnOrder: columnOrder,
      columns: columns,
      transitionTime: options.draggableColumns ? options.draggableColumns.transitionTime : 300,
      tableRef: tableRef ? tableRef() : null,
      tableId: tableId || 'none',
      timers: timers
    }),
    _useColumnDrop2 = _slicedToArray(_useColumnDrop, 1),
    drop = _useColumnDrop2[0];
  var cellClass = clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, classes.root, true), classes.fixedHeader, options.fixedHeader), 'datatables-noprint', !print), className, className));
  var showHintTooltip = function showHintTooltip() {
    setSortTooltipOpen(false);
    setHintTooltipOpen(true);
  };
  var getTooltipTitle = function getTooltipTitle() {
    if (dragging) return '';
    if (!options.textLabels) return '';
    return options.textLabels.body.columnHeaderTooltip ? options.textLabels.body.columnHeaderTooltip(column) : options.textLabels.body.toolTip;
  };
  var closeTooltip = function closeTooltip() {
    setSortTooltipOpen(false);
  };
  return /*#__PURE__*/React.createElement(TableCell, _extends({
    ref: function ref(_ref4) {
      drop && drop(_ref4);
      setCellRef && setCellRef(index + 1, colPosition + 1, _ref4);
    },
    className: cellClass,
    scope: 'col',
    sortDirection: ariaSortDirection,
    "data-colindex": index,
    "data-tableid": tableId,
    onMouseDown: closeTooltip
  }, otherProps), _sortInstanceProperty(options) && sort ? /*#__PURE__*/React.createElement("span", {
    className: classes.contentWrapper
  }, /*#__PURE__*/React.createElement(Tooltip, {
    title: getTooltipTitle(),
    placement: "bottom",
    open: sortTooltipOpen,
    onOpen: function onOpen() {
      return dragging ? setSortTooltipOpen(false) : setSortTooltipOpen(true);
    },
    onClose: function onClose() {
      return setSortTooltipOpen(false);
    },
    classes: {
      tooltip: classes.tooltip,
      popper: classes.mypopper
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "",
    onKeyUp: handleKeyboardSortInput,
    onClick: handleSortClick,
    className: classes.toolButton,
    "data-testid": "headcol-".concat(index),
    ref: isDraggingEnabled() ? dragRef : null
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.sortAction
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx(_defineProperty(_defineProperty(_defineProperty({}, classes.data, true), classes.sortActive, sortActive), classes.dragCursor, isDraggingEnabled()))
  }, children), /*#__PURE__*/React.createElement("div", {
    className: classes.sortAction
  }, /*#__PURE__*/React.createElement(TableSortLabel, sortLabelProps))))), hint && /*#__PURE__*/React.createElement(Tooltip, {
    title: hint
  }, /*#__PURE__*/React.createElement(HelpIcon, {
    className: !sortActive ? classes.hintIconAlone : classes.hintIconWithSortIcon,
    fontSize: "small"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: hint ? classes.sortAction : null,
    ref: isDraggingEnabled() ? dragRef : null
  }, children, hint && /*#__PURE__*/React.createElement(Tooltip, {
    title: hint,
    placement: 'bottom-end',
    open: hintTooltipOpen,
    onOpen: function onOpen() {
      return showHintTooltip();
    },
    onClose: function onClose() {
      return setHintTooltipOpen(false);
    },
    classes: {
      tooltip: classes.tooltip,
      popper: classes.mypopper
    },
    enterDelay: 300
  }, /*#__PURE__*/React.createElement(HelpIcon, {
    className: classes.hintIconAlone,
    fontSize: "small"
  }))));
};
TableHeadCell.propTypes = {
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Current sort direction */
  sortDirection: PropTypes.oneOf(['asc', 'desc', 'none']),
  /** Callback to trigger column sort */
  toggleSort: PropTypes.func.isRequired,
  /** Sort enabled / disabled for this column **/
  sort: PropTypes.bool.isRequired,
  /** Hint tooltip text */
  hint: PropTypes.string,
  /** Column displayed in print */
  print: PropTypes.bool.isRequired,
  /** Optional to be used with `textLabels.body.columnHeaderTooltip` */
  column: PropTypes.object,
  /** Injectable component structure **/
  components: PropTypes.object
};

var useStyles$3 = mui.makeStyles({
  name: 'MUIDataTableHeadRow'
})(function () {
  return {
    root: {}
  };
});
var TableHeadRow = function TableHeadRow(_ref) {
  var children = _ref.children;
  var _useStyles = useStyles$3(),
    classes = _useStyles.classes;
  return /*#__PURE__*/React.createElement(TableRow, {
    className: clsx(_defineProperty({}, classes.root, true))
  }, children);
};
TableHeadRow.propTypes = {
  children: PropTypes.node
};

function ownKeys$2(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys$2(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys$2(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var useStyles$2 = mui.makeStyles({
  name: 'MUIDataTableHead'
})(function (theme) {
  return {
    main: {},
    responsiveStacked: _defineProperty({}, theme.breakpoints.down('md'), {
      display: 'none'
    }),
    responsiveStackedAlways: {
      display: 'none'
    },
    responsiveSimple: _defineProperty({}, theme.breakpoints.down('sm'), {
      display: 'none'
    })
  };
});
var TableHead = function TableHead(_ref) {
  var _ref$columnOrder = _ref.columnOrder,
    columnOrder = _ref$columnOrder === void 0 ? null : _ref$columnOrder,
    columns = _ref.columns,
    _ref$components = _ref.components,
    components = _ref$components === void 0 ? {} : _ref$components,
    count = _ref.count,
    data = _ref.data,
    draggableHeadCellRefs = _ref.draggableHeadCellRefs,
    expandedRows = _ref.expandedRows,
    options = _ref.options,
    selectedRows = _ref.selectedRows,
    selectRowUpdate = _ref.selectRowUpdate,
    setCellRef = _ref.setCellRef,
    _ref$sortOrder = _ref.sortOrder,
    sortOrder = _ref$sortOrder === void 0 ? {} : _ref$sortOrder,
    tableRef = _ref.tableRef,
    tableId = _ref.tableId,
    timers = _ref.timers,
    toggleAllExpandableRows = _ref.toggleAllExpandableRows,
    toggleSort = _ref.toggleSort,
    updateColumnOrder = _ref.updateColumnOrder;
  var _useStyles = useStyles$2(),
    classes = _useStyles.classes;
  if (columnOrder === null) {
    columnOrder = columns ? _mapInstanceProperty(columns).call(columns, function (item, idx) {
      return idx;
    }) : [];
  }
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    dragging = _useState2[0],
    setDragging = _useState2[1];
  var handleToggleColumn = function handleToggleColumn(index) {
    toggleSort(index);
  };
  var handleRowSelect = function handleRowSelect() {
    selectRowUpdate('head', null);
  };
  var numSelected = selectedRows && selectedRows.data.length || 0;
  var isIndeterminate = numSelected > 0 && numSelected < count;
  var isChecked = numSelected > 0 && numSelected >= count;

  // When the disableToolbarSelect option is true, there can be
  // selected items that aren't visible, so we need to be more
  // precise when determining if the head checkbox should be checked.
  if (options.disableToolbarSelect === true || options.selectToolbarPlacement === 'none' || options.selectToolbarPlacement === 'above') {
    if (isChecked) {
      for (var ii = 0; ii < data.length; ii++) {
        if (!selectedRows.lookup[data[ii].dataIndex]) {
          isChecked = false;
          isIndeterminate = true;
          break;
        }
      }
    } else {
      if (numSelected > count) {
        isIndeterminate = true;
      }
    }
  }
  var orderedColumns = _mapInstanceProperty(columnOrder).call(columnOrder, function (colIndex, idx) {
    return {
      column: columns[colIndex],
      index: colIndex,
      colPos: idx
    };
  });
  return /*#__PURE__*/React.createElement(MuiTableHead, {
    className: clsx(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, classes.responsiveStacked, options.responsive === 'vertical' || options.responsive === 'stacked' || options.responsive === 'stackedFullWidth'), classes.responsiveStackedAlways, options.responsive === 'verticalAlways'), classes.responsiveSimple, options.responsive === 'simple'), classes.main, true))
  }, /*#__PURE__*/React.createElement(TableHeadRow, null, /*#__PURE__*/React.createElement(TableSelectCell, {
    setHeadCellRef: setCellRef,
    onChange: _bindInstanceProperty(handleRowSelect).call(handleRowSelect, null),
    indeterminate: isIndeterminate,
    checked: isChecked,
    isHeaderCell: true,
    expandedRows: expandedRows,
    expandableRowsHeader: options.expandableRowsHeader,
    expandableOn: options.expandableRows,
    selectableOn: options.selectableRows,
    fixedHeader: options.fixedHeader,
    fixedSelectColumn: options.fixedSelectColumn,
    selectableRowsHeader: options.selectableRowsHeader,
    selectableRowsHideCheckboxes: options.selectableRowsHideCheckboxes,
    onExpand: toggleAllExpandableRows,
    isRowSelectable: true,
    components: components
  }), _mapInstanceProperty(orderedColumns).call(orderedColumns, function (_ref2) {
    var column = _ref2.column,
      index = _ref2.index,
      colPos = _ref2.colPos;
    return column.display === 'true' && (column.customHeadRender ? column.customHeadRender(_objectSpread$2({
      index: index
    }, column), handleToggleColumn, sortOrder) : /*#__PURE__*/React.createElement(TableHeadCell, {
      cellHeaderProps: columns[index].setCellHeaderProps ? columns[index].setCellHeaderProps(_objectSpread$2({
        index: index
      }, column)) || {} : {},
      key: index,
      index: index,
      colPosition: colPos,
      type: 'cell',
      setCellRef: setCellRef,
      sort: _sortInstanceProperty(column),
      sortDirection: column.name === sortOrder.name ? sortOrder.direction : 'none',
      toggleSort: handleToggleColumn,
      hint: column.hint,
      print: column.print,
      options: options,
      column: column,
      columns: columns,
      updateColumnOrder: updateColumnOrder,
      columnOrder: columnOrder,
      timers: timers,
      draggingHook: [dragging, setDragging],
      draggableHeadCellRefs: draggableHeadCellRefs,
      tableRef: tableRef,
      tableId: tableId,
      components: components
    }, column.customHeadLabelRender ? column.customHeadLabelRender(_objectSpread$2({
      index: index,
      colPos: colPos
    }, column)) : column.label));
  })));
};

function ownKeys$1(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var _context7, _context8; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context7 = ownKeys$1(Object(t), !0)).call(_context7, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context8 = ownKeys$1(Object(t))).call(_context8, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper$4(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$4() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$4() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultResizeStyles = {
  root: {
    position: 'absolute'
  },
  resizer: {
    position: 'absolute',
    width: '1px',
    height: '100%',
    left: '100px',
    cursor: 'ew-resize',
    border: '0.1px solid rgba(224, 224, 224, 1)'
  }
};
function getParentOffsetLeft(tableEl) {
  var ii = 0,
    parentOffsetLeft = 0,
    offsetParent = tableEl.offsetParent;
  while (offsetParent) {
    parentOffsetLeft = parentOffsetLeft + (offsetParent.offsetLeft || 0) - (offsetParent.scrollLeft || 0);
    offsetParent = offsetParent.offsetParent;
    ii++;
    if (ii > 1000) break;
  }
  return parentOffsetLeft;
}
var TableResize = /*#__PURE__*/function (_React$Component) {
  function TableResize() {
    var _context;
    var _this;
    _classCallCheck(this, TableResize);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$4(this, TableResize, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_this, "state", {
      resizeCoords: {},
      priorPosition: {},
      tableWidth: '100%',
      tableHeight: '100%'
    });
    _defineProperty(_this, "handleResize", function () {
      if (window.innerWidth !== _this.windowWidth) {
        _this.windowWidth = window.innerWidth;
        _this.setDividers();
      }
    });
    _defineProperty(_this, "setCellRefs", function (cellsRef, tableRef) {
      _this.cellsRef = cellsRef;
      _this.tableRef = tableRef;
      _this.setDividers();
    });
    _defineProperty(_this, "setDividers", function () {
      var tableEl = _this.tableRef;
      var _tableEl$getBoundingC = tableEl.getBoundingClientRect(),
        tableWidth = _tableEl$getBoundingC.width,
        tableHeight = _tableEl$getBoundingC.height;
      var resizeCoords = _this.state.resizeCoords;
      for (var prop in resizeCoords) {
        delete resizeCoords[prop];
      }
      var parentOffsetLeft = getParentOffsetLeft(tableEl);
      var finalCells = _Object$entries(_this.cellsRef);
      var cellMinusOne = _filterInstanceProperty(finalCells).call(finalCells, function (_item, ix) {
        return ix + 1 < finalCells.length;
      });
      _forEachInstanceProperty(cellMinusOne).call(cellMinusOne, function (_ref, idx) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          item = _ref2[1];
        if (!item) return;
        var elRect = item.getBoundingClientRect();
        var left = elRect.left;
        left = (left || 0) - parentOffsetLeft;
        window.getComputedStyle(item, null);
        resizeCoords[key] = {
          left: left + item.offsetWidth
        };
      });
      _this.setState({
        tableWidth: tableWidth,
        tableHeight: tableHeight,
        resizeCoords: resizeCoords
      }, _this.updateWidths);
    });
    _defineProperty(_this, "updateWidths", function () {
      var _context2;
      var lastPosition = 0;
      var _this$state = _this.state,
        resizeCoords = _this$state.resizeCoords,
        tableWidth = _this$state.tableWidth;
      _forEachInstanceProperty(_context2 = _Object$entries(resizeCoords)).call(_context2, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          item = _ref4[1];
        var newWidth = Number((item.left - lastPosition) / tableWidth * 100);

        /*
          Using .toFixed(2) causes the columns to jitter when resized. On all browsers I (patrojk) have tested,
          a width with a floating point decimal works fine. It's unclear to me why the numbers were being rouned.
          However, I'm putting in an undocumented escape hatch to use toFixed in case the change introduces a bug.
          The below code will be removed in a later release if no problems with non-rounded widths are reported.
        */
        if (_typeof(_this.props.resizableColumns) === 'object' && _this.props.resizableColumns.roundWidthPercentages) {
          newWidth = newWidth.toFixed(2);
        }
        lastPosition = item.left;
        var thCell = _this.cellsRef[key];
        if (thCell) thCell.style.width = newWidth + '%';
      });
    });
    _defineProperty(_this, "onResizeStart", function (id, e) {
      var tableEl = _this.tableRef;
      var originalWidth = tableEl.style.width;
      var lastColumn = 0;
      tableEl.style.width = '1px';
      var finalCells = _Object$entries(_this.cellsRef);
      _forEachInstanceProperty(finalCells).call(finalCells, function (_ref5, idx) {
        var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          item = _ref6[1];
        var elRect = item ? item.getBoundingClientRect() : {
          width: 0,
          left: 0
        };
        _this.minWidths[key] = elRect.width;
        lastColumn = Math.max(key, lastColumn);
      });
      tableEl.style.width = originalWidth;
      _this.setState({
        isResize: true,
        id: id,
        lastColumn: lastColumn
      });
    });
    _defineProperty(_this, "onResizeMove", function (id, e) {
      var _this$state2 = _this.state,
        isResize = _this$state2.isResize,
        resizeCoords = _this$state2.resizeCoords,
        lastColumn = _this$state2.lastColumn;
      var prevCol = function prevCol(id) {
        var nextId = id - 1;
        while (typeof resizeCoords[nextId] === 'undefined' && nextId >= 0) {
          nextId--;
        }
        return nextId;
      };
      var nextCol = function nextCol(id) {
        var nextId = id + 1;
        var tries = 0;
        while (typeof resizeCoords[nextId] === 'undefined' && tries < 20) {
          nextId++;
          tries++;
        }
        return nextId;
      };
      var fixedMinWidth1 = _this.minWidths[id];
      var fixedMinWidth2 = _this.minWidths[nextCol(_parseInt(id, 10))] || _this.minWidths[id];
      var idNumber = _parseInt(id, 10);
      var finalCells = _Object$entries(_this.cellsRef);
      var tableEl = _this.tableRef;
      var _tableEl$getBoundingC2 = tableEl.getBoundingClientRect(),
        tableWidth = _tableEl$getBoundingC2.width,
        tableHeight = _tableEl$getBoundingC2.height;
      var selectableRows = _this.props.options.selectableRows;
      var parentOffsetLeft = getParentOffsetLeft(tableEl);
      var nextCoord = function nextCoord(id) {
        var nextId = id + 1;
        var tries = 0;
        while (typeof resizeCoords[nextId] === 'undefined' && tries < 20) {
          nextId++;
          tries++;
        }
        return resizeCoords[nextId];
      };
      var prevCoord = function prevCoord(id) {
        var nextId = id - 1;
        while (typeof resizeCoords[nextId] === 'undefined' && nextId >= 0) {
          nextId--;
        }
        return resizeCoords[nextId];
      };
      if (isResize) {
        var leftPos = e.clientX - parentOffsetLeft;
        var handleMoveRightmostBoundary = function handleMoveRightmostBoundary(leftPos, tableWidth, fixedMinWidth) {
          if (leftPos > tableWidth - fixedMinWidth) {
            return tableWidth - fixedMinWidth;
          }
          return leftPos;
        };
        var handleMoveLeftmostBoundary = function handleMoveLeftmostBoundary(leftPos, fixedMinWidth) {
          if (leftPos < fixedMinWidth) {
            return fixedMinWidth;
          }
          return leftPos;
        };
        var handleMoveRight = function handleMoveRight(leftPos, resizeCoords, id, fixedMinWidth) {
          if (typeof nextCoord(id) === 'undefined') return leftPos;
          if (leftPos > nextCoord(id).left - fixedMinWidth) {
            return nextCoord(id).left - fixedMinWidth;
          }
          return leftPos;
        };
        var handleMoveLeft = function handleMoveLeft(leftPos, resizeCoords, id, fixedMinWidth) {
          if (typeof prevCoord(id) === 'undefined') return leftPos;
          if (leftPos < prevCoord(id).left + fixedMinWidth) {
            return prevCoord(id).left + fixedMinWidth;
          }
          return leftPos;
        };
        var isFirstColumn = function isFirstColumn(selectableRows, id) {
          var firstColumn = 1;
          while (!resizeCoords[firstColumn] && firstColumn < 20) {
            firstColumn++;
          }
          return selectableRows !== 'none' && id === 0 || selectableRows === 'none' && id === firstColumn;
        };
        var isLastColumn = function isLastColumn(id, finalCells) {
          return id === prevCol(lastColumn);
        };
        if (isFirstColumn(selectableRows, idNumber) && isLastColumn(idNumber, finalCells)) {
          leftPos = handleMoveLeftmostBoundary(leftPos, fixedMinWidth1);
          leftPos = handleMoveRightmostBoundary(leftPos, tableWidth, fixedMinWidth2);
        } else if (!isFirstColumn(selectableRows, idNumber) && isLastColumn(idNumber, finalCells)) {
          leftPos = handleMoveRightmostBoundary(leftPos, tableWidth, fixedMinWidth2);
          leftPos = handleMoveLeft(leftPos, resizeCoords, idNumber, fixedMinWidth1);
        } else if (isFirstColumn(selectableRows, idNumber) && !isLastColumn(idNumber, finalCells)) {
          leftPos = handleMoveLeftmostBoundary(leftPos, fixedMinWidth1);
          leftPos = handleMoveRight(leftPos, resizeCoords, idNumber, fixedMinWidth2);
        } else if (!isFirstColumn(selectableRows, idNumber) && !isLastColumn(idNumber, finalCells)) {
          leftPos = handleMoveLeft(leftPos, resizeCoords, idNumber, fixedMinWidth1);
          leftPos = handleMoveRight(leftPos, resizeCoords, idNumber, fixedMinWidth2);
        }
        var curCoord = _objectSpread$1(_objectSpread$1({}, resizeCoords[id]), {}, {
          left: leftPos
        });
        var newResizeCoords = _objectSpread$1(_objectSpread$1({}, resizeCoords), {}, _defineProperty({}, id, curCoord));
        _this.setState({
          resizeCoords: newResizeCoords,
          tableHeight: tableHeight
        }, _this.updateWidths);
      }
    });
    _defineProperty(_this, "onResizeEnd", function (id, e) {
      _this.setState({
        isResize: false,
        id: null
      });
    });
    return _this;
  }
  _inherits(TableResize, _React$Component);
  return _createClass(TableResize, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.minWidths = [];
      this.windowWidth = null;
      this.props.setResizeable(this.setCellRefs);
      this.props.updateDividers(function () {
        return _this2.setState({
          updateCoords: true
        }, function () {
          return _this2.updateWidths;
        });
      });
      window.addEventListener('resize', this.handleResize, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _context3,
        _this3 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        tableId = _this$props.tableId;
      var _this$state3 = this.state,
        id = _this$state3.id,
        isResize = _this$state3.isResize,
        resizeCoords = _this$state3.resizeCoords,
        tableWidth = _this$state3.tableWidth,
        tableHeight = _this$state3.tableHeight;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.root,
        style: {
          width: tableWidth
        }
      }, _mapInstanceProperty(_context3 = _Object$entries(resizeCoords)).call(_context3, function (_ref7) {
        var _context4, _context5, _context6;
        var _ref8 = _slicedToArray(_ref7, 2),
          key = _ref8[0],
          val = _ref8[1];
        return /*#__PURE__*/React.createElement("div", {
          "data-divider-index": key,
          "data-tableid": tableId,
          "aria-hidden": "true",
          key: key,
          onMouseMove: _bindInstanceProperty(_context4 = _this3.onResizeMove).call(_context4, null, key),
          onMouseUp: _bindInstanceProperty(_context5 = _this3.onResizeEnd).call(_context5, null, key),
          style: {
            width: isResize && id == key ? tableWidth : 'auto',
            position: 'absolute',
            height: tableHeight - 2,
            cursor: 'ew-resize',
            zIndex: 1000
          }
        }, /*#__PURE__*/React.createElement("div", {
          "aria-hidden": "true",
          onMouseDown: _bindInstanceProperty(_context6 = _this3.onResizeStart).call(_context6, null, key),
          className: classes.resizer,
          style: {
            left: val.left
          }
        }));
      }));
    }
  }]);
}(React.Component);
_defineProperty(TableResize, "propTypes", {
  /** Extend the style applied to components */
  classes: PropTypes.object
});
var DefaultTableResize = mui.withStyles(TableResize, defaultResizeStyles, {
  name: 'MUIDataTableResize'
});

var _excluded$2 = ["className", "trigger", "refExit", "hide", "content"];
var Popover = function Popover(_ref) {
  _ref.className;
    var trigger = _ref.trigger,
    refExit = _ref.refExit,
    hide = _ref.hide,
    content = _ref.content,
    providedProps = _objectWithoutProperties(_ref, _excluded$2);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    open = _useState2[1];
  var anchorEl = React.useRef(null);
  React.useEffect(function () {
    if (isOpen) {
      var shouldHide = typeof hide === 'boolean' ? hide : false;
      if (shouldHide) {
        open(false);
      }
    }
  }, [hide, isOpen, open]);
  var handleClick = function handleClick(event) {
    anchorEl.current = event.currentTarget;
    open(true);
  };
  var handleRequestClose = function handleRequestClose() {
    open(false);
  };
  var closeIconClass = providedProps.classes.closeIcon;
  delete providedProps.classes.closeIcon; // remove non-standard class from being passed to the popover component

  var transformOriginSpecs = {
    vertical: 'top',
    horizontal: 'center'
  };
  var anchorOriginSpecs = {
    vertical: 'bottom',
    horizontal: 'center'
  };
  var handleOnExit = function handleOnExit() {
    if (refExit) {
      refExit();
    }
  };
  var triggerProps = {
    key: 'content',
    onClick: function onClick(event) {
      if (trigger.props.onClick) trigger.props.onClick();
      handleClick(event);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", triggerProps, trigger), /*#__PURE__*/React.createElement(MuiPopover, _extends({
    elevation: 2,
    open: isOpen,
    TransitionProps: {
      onExited: handleOnExit
    },
    onClose: handleRequestClose,
    anchorEl: anchorEl.current,
    anchorOrigin: anchorOriginSpecs,
    transformOrigin: transformOriginSpecs
  }, providedProps), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Close",
    onClick: handleRequestClose,
    className: closeIconClass,
    style: {
      position: 'absolute',
      right: '4px',
      top: '4px',
      zIndex: '1000'
    }
  }, /*#__PURE__*/React.createElement(CloseIcon, null)), content));
};
Popover.propTypes = {
  refExit: PropTypes.func,
  trigger: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  hide: PropTypes.bool
};

var useStyles$1 = mui.makeStyles({
  name: 'MUIDataTableViewCol'
})(function (theme) {
  return {
    root: {
      padding: '16px 24px 16px 24px',
      fontFamily: 'Roboto'
    },
    title: {
      marginLeft: '-7px',
      marginRight: '24px',
      fontSize: '14px',
      color: theme.palette.text.secondary,
      textAlign: 'left',
      fontWeight: 500
    },
    formGroup: {
      marginTop: '8px'
    },
    formControl: {},
    checkbox: {
      padding: '0px',
      width: '32px',
      height: '32px'
    },
    checkboxRoot: {},
    checked: {},
    label: {
      fontSize: '15px',
      marginLeft: '8px',
      color: theme.palette.text.primary
    }
  };
});
var TableViewCol = function TableViewCol(_ref) {
  var columns = _ref.columns,
    options = _ref.options,
    _ref$components = _ref.components,
    components = _ref$components === void 0 ? {} : _ref$components,
    onColumnUpdate = _ref.onColumnUpdate;
    _ref.updateColumns;
  var _useStyles = useStyles$1(),
    classes = _useStyles.classes;
  var textLabels = options.textLabels.viewColumns;
  var CheckboxComponent = components.Checkbox || Checkbox;
  var handleColChange = function handleColChange(index) {
    onColumnUpdate(index);
  };
  return /*#__PURE__*/React.createElement(FormControl, {
    component: 'fieldset',
    className: classes.root,
    "aria-label": textLabels.titleAria
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    className: classes.title
  }, textLabels.title), /*#__PURE__*/React.createElement(FormGroup, {
    className: classes.formGroup
  }, _mapInstanceProperty(columns).call(columns, function (column, index) {
    return column.display !== 'excluded' && column.viewColumns !== false && /*#__PURE__*/React.createElement(FormControlLabel, {
      key: index,
      classes: {
        root: classes.formControl,
        label: classes.label
      },
      control: /*#__PURE__*/React.createElement(CheckboxComponent, {
        color: "primary",
        "data-description": "table-view-col",
        className: classes.checkbox,
        classes: {
          root: classes.checkboxRoot,
          checked: classes.checked
        },
        onChange: function onChange() {
          return handleColChange(index);
        },
        checked: column.display === 'true',
        value: column.name
      }),
      label: column.label
    });
  })));
};
TableViewCol.propTypes = {
  /** Columns used to describe table */
  columns: PropTypes.array.isRequired,
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Callback to trigger View column update */
  onColumnUpdate: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object
};

var useStyles = mui.makeStyles({
  name: 'MUIDataTableSearch'
})(function (theme) {
  return {
    main: {
      display: 'flex',
      flex: '1 0 auto',
      alignItems: 'center'
    },
    searchIcon: {
      color: theme.palette.text.secondary,
      marginRight: '8px'
    },
    searchText: {
      flex: '0.8 0'
    },
    clearIcon: {
      '&:hover': {
        color: theme.palette.error.main
      }
    }
  };
});
var TableSearch = function TableSearch(_ref) {
  var options = _ref.options,
    searchText = _ref.searchText,
    onSearch = _ref.onSearch,
    onHide = _ref.onHide;
  var _useStyles = useStyles(),
    classes = _useStyles.classes;
  var handleTextChange = function handleTextChange(event) {
    onSearch(event.target.value);
  };
  var onKeyDown = function onKeyDown(event) {
    if (event.key === 'Escape') {
      onHide();
    }
  };
  var clearIconVisibility = options.searchAlwaysOpen ? 'hidden' : 'visible';
  return /*#__PURE__*/React.createElement(Grow, {
    appear: true,
    in: true,
    timeout: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.main
  }, /*#__PURE__*/React.createElement(SearchIcon, {
    className: classes.searchIcon
  }), /*#__PURE__*/React.createElement(TextField, _extends({
    className: classes.searchText,
    autoFocus: true,
    variant: 'standard',
    InputProps: {
      'data-test-id': options.textLabels.toolbar.search
    },
    inputProps: {
      'aria-label': options.textLabels.toolbar.search
    },
    value: searchText || '',
    onKeyDown: onKeyDown,
    onChange: handleTextChange,
    fullWidth: true,
    placeholder: options.searchPlaceholder
  }, options.searchProps ? options.searchProps : {})), /*#__PURE__*/React.createElement(IconButton, {
    className: classes.clearIcon,
    style: {
      visibility: clearIconVisibility
    },
    onClick: onHide
  }, /*#__PURE__*/React.createElement(ClearIcon, null))));
};

function _callSuper$3(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$3() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$3() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultToolbarStyles = function defaultToolbarStyles(theme) {
  return _defineProperty(_defineProperty(_defineProperty({
    root: {
      '@media print': {
        display: 'none'
      }
    },
    fullWidthRoot: {},
    left: {
      flex: '1 1 auto'
    },
    fullWidthLeft: {
      flex: '1 1 auto'
    },
    actions: {
      flex: '1 1 auto',
      textAlign: 'right'
    },
    fullWidthActions: {
      flex: '1 1 auto',
      textAlign: 'right'
    },
    titleRoot: {},
    titleText: {},
    fullWidthTitleText: {
      textAlign: 'left'
    },
    icon: {
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    iconActive: {
      color: theme.palette.primary.main
    },
    filterPaper: {
      maxWidth: '50%'
    },
    filterCloseIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 100
    },
    searchIcon: {
      display: 'inline-flex',
      marginTop: '10px',
      marginRight: '8px'
    }
  }, theme.breakpoints.down('md'), {
    titleRoot: {},
    titleText: {
      fontSize: '16px'
    },
    spacer: {
      display: 'none'
    },
    left: {
      // flex: "1 1 40%",
      padding: '8px 0px'
    },
    actions: {
      // flex: "1 1 60%",
      textAlign: 'right'
    }
  }), theme.breakpoints.down('sm'), {
    root: {
      display: 'block',
      '@media print': {
        display: 'none !important'
      }
    },
    left: {
      padding: '8px 0px 0px 0px'
    },
    titleText: {
      textAlign: 'center'
    },
    actions: {
      textAlign: 'center'
    }
  }), '@media screen and (max-width: 480px)', {});
};
var RESPONSIVE_FULL_WIDTH_NAME = 'scrollFullHeightFullWidth';
var TableToolbar = /*#__PURE__*/function (_React$Component) {
  function TableToolbar() {
    var _context;
    var _this;
    _classCallCheck(this, TableToolbar);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$3(this, TableToolbar, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_this, "state", {
      iconActive: null,
      showSearch: Boolean(_this.props.searchText || _this.props.options.searchText || _this.props.options.searchOpen || _this.props.options.searchAlwaysOpen),
      searchText: _this.props.searchText || null
    });
    _defineProperty(_this, "handleCSVDownload", function () {
      var _this$props = _this.props,
        data = _this$props.data,
        displayData = _this$props.displayData,
        columns = _this$props.columns,
        options = _this$props.options,
        columnOrder = _this$props.columnOrder;
      var dataToDownload = []; //cloneDeep(data);
      var columnsToDownload = [];
      var columnOrderCopy = _Array$isArray(columnOrder) ? _sliceInstanceProperty(columnOrder).call(columnOrder, 0) : [];
      if (columnOrderCopy.length === 0) {
        columnOrderCopy = _mapInstanceProperty(columns).call(columns, function (item, idx) {
          return idx;
        });
      }
      _forEachInstanceProperty(data).call(data, function (row) {
        var newRow = {
          index: row.index,
          data: []
        };
        _forEachInstanceProperty(columnOrderCopy).call(columnOrderCopy, function (idx) {
          newRow.data.push(row.data[idx]);
        });
        dataToDownload.push(newRow);
      });
      _forEachInstanceProperty(columnOrderCopy).call(columnOrderCopy, function (idx) {
        columnsToDownload.push(columns[idx]);
      });
      if (options.downloadOptions && options.downloadOptions.filterOptions) {
        // check rows first:
        if (options.downloadOptions.filterOptions.useDisplayedRowsOnly) {
          var filteredDataToDownload = _mapInstanceProperty(displayData).call(displayData, function (row, index) {
            var _context2;
            var i = -1;

            // Help to preserve sort order in custom render columns
            row.index = index;
            return {
              data: _mapInstanceProperty(_context2 = row.data).call(_context2, function (column) {
                i += 1;

                // if we have a custom render, which will appear as a react element, we must grab the actual value from data
                // that matches the dataIndex and column
                // TODO: Create a utility function for checking whether or not something is a react object
                var val = _typeof(column) === 'object' && column !== null && !_Array$isArray(column) ? find(data, function (d) {
                  return d.index === row.dataIndex;
                }).data[i] : column;
                val = typeof val === 'function' ? find(data, function (d) {
                  return d.index === row.dataIndex;
                }).data[i] : val;
                return val;
              })
            };
          });
          dataToDownload = [];
          _forEachInstanceProperty(filteredDataToDownload).call(filteredDataToDownload, function (row) {
            var newRow = {
              index: row.index,
              data: []
            };
            _forEachInstanceProperty(columnOrderCopy).call(columnOrderCopy, function (idx) {
              newRow.data.push(row.data[idx]);
            });
            dataToDownload.push(newRow);
          });
        }

        // now, check columns:
        if (options.downloadOptions.filterOptions.useDisplayedColumnsOnly) {
          columnsToDownload = _filterInstanceProperty(columnsToDownload).call(columnsToDownload, function (_) {
            return _.display === 'true';
          });
          dataToDownload = _mapInstanceProperty(dataToDownload).call(dataToDownload, function (row) {
            var _context3;
            row.data = _filterInstanceProperty(_context3 = row.data).call(_context3, function (_, index) {
              return columns[columnOrderCopy[index]].display === 'true';
            });
            return row;
          });
        }
      }
      createCSVDownload(columnsToDownload, dataToDownload, options, downloadCSV);
    });
    _defineProperty(_this, "setActiveIcon", function (iconName) {
      _this.setState(function (prevState) {
        return {
          showSearch: _this.isSearchShown(iconName),
          iconActive: iconName,
          prevIconActive: prevState.iconActive
        };
      }, function () {
        var _this$state = _this.state,
          iconActive = _this$state.iconActive,
          prevIconActive = _this$state.prevIconActive;
        if (iconActive === 'filter') {
          _this.props.setTableAction('onFilterDialogOpen');
          if (_this.props.options.onFilterDialogOpen) {
            _this.props.options.onFilterDialogOpen();
          }
        }
        if (iconActive === undefined && prevIconActive === 'filter') {
          _this.props.setTableAction('onFilterDialogClose');
          if (_this.props.options.onFilterDialogClose) {
            _this.props.options.onFilterDialogClose();
          }
        }
      });
    });
    _defineProperty(_this, "isSearchShown", function (iconName) {
      if (_this.props.options.searchAlwaysOpen) {
        return true;
      }
      var nextVal = false;
      if (_this.state.showSearch) {
        if (_this.state.searchText) {
          nextVal = true;
        } else {
          var onSearchClose = _this.props.options.onSearchClose;
          _this.props.setTableAction('onSearchClose');
          if (onSearchClose) onSearchClose();
          nextVal = false;
        }
      } else if (iconName === 'search') {
        nextVal = _this.showSearch();
      }
      return nextVal;
    });
    _defineProperty(_this, "getActiveIcon", function (styles, iconName) {
      var isActive = _this.state.iconActive === iconName;
      if (iconName === 'search') {
        var _this$state2 = _this.state,
          showSearch = _this$state2.showSearch,
          searchText = _this$state2.searchText;
        isActive = isActive || showSearch || searchText;
      }
      return isActive ? styles.iconActive : styles.icon;
    });
    _defineProperty(_this, "showSearch", function () {
      _this.props.setTableAction('onSearchOpen');
      !!_this.props.options.onSearchOpen && _this.props.options.onSearchOpen();
      return true;
    });
    _defineProperty(_this, "hideSearch", function () {
      var onSearchClose = _this.props.options.onSearchClose;
      _this.props.setTableAction('onSearchClose');
      if (onSearchClose) onSearchClose();
      _this.props.searchClose();
      _this.setState(function () {
        return {
          iconActive: null,
          showSearch: false,
          searchText: null
        };
      });
    });
    _defineProperty(_this, "handleSearch", function (value) {
      _this.setState({
        searchText: value
      });
      _this.props.searchTextUpdate(value);
    });
    _defineProperty(_this, "handleSearchIconClick", function () {
      var _this$state3 = _this.state,
        showSearch = _this$state3.showSearch,
        searchText = _this$state3.searchText;
      if (showSearch && !searchText) {
        _this.hideSearch();
      } else {
        _this.setActiveIcon('search');
      }
    });
    return _this;
  }
  _inherits(TableToolbar, _React$Component);
  return _createClass(TableToolbar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.searchText !== prevProps.searchText) {
        this.setState({
          searchText: this.props.searchText
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this,
        _context4,
        _context5,
        _context6;
      var _this$props2 = this.props,
        data = _this$props2.data,
        options = _this$props2.options,
        classes = _this$props2.classes,
        columns = _this$props2.columns,
        filterData = _this$props2.filterData,
        filterList = _this$props2.filterList,
        filterUpdate = _this$props2.filterUpdate,
        resetFilters = _this$props2.resetFilters,
        toggleViewColumn = _this$props2.toggleViewColumn,
        updateColumns = _this$props2.updateColumns,
        title = _this$props2.title,
        _this$props2$componen = _this$props2.components,
        components = _this$props2$componen === void 0 ? {} : _this$props2$componen,
        updateFilterByType = _this$props2.updateFilterByType;
      var _components$icons = components.icons,
        icons = _components$icons === void 0 ? {} : _components$icons;
      var Tooltip = components.Tooltip || MuiTooltip;
      var TableViewColComponent = components.TableViewCol || TableViewCol;
      var TableFilterComponent = components.TableFilter || DefaultTableFilter;
      var SearchIconComponent = icons.SearchIcon || SearchIcon;
      var DownloadIconComponent = icons.DownloadIcon || DownloadIcon;
      var PrintIconComponent = icons.PrintIcon || PrintIcon;
      var ViewColumnIconComponent = icons.ViewColumnIcon || ViewColumnIcon;
      var FilterIconComponent = icons.FilterIcon || FilterIcon;
      var _options$textLabels$t = options.textLabels.toolbar,
        search = _options$textLabels$t.search,
        downloadCsv = _options$textLabels$t.downloadCsv,
        print = _options$textLabels$t.print,
        viewColumns = _options$textLabels$t.viewColumns,
        filterTable = _options$textLabels$t.filterTable;
      var _this$state4 = this.state,
        showSearch = _this$state4.showSearch,
        searchText = _this$state4.searchText;
      var filterPopoverExit = function filterPopoverExit() {
        _this2.setState({
          hideFilterPopover: false
        });
        _this2.setActiveIcon();
      };
      var closeFilterPopover = function closeFilterPopover() {
        _this2.setState({
          hideFilterPopover: true
        });
      };
      return /*#__PURE__*/React.createElement(Toolbar, {
        className: options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.root : classes.fullWidthRoot,
        role: 'toolbar',
        "aria-label": 'Table Toolbar'
      }, /*#__PURE__*/React.createElement("div", {
        className: options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.left : classes.fullWidthLeft
      }, showSearch === true ? options.customSearchRender ? options.customSearchRender(searchText, this.handleSearch, this.hideSearch, options) : /*#__PURE__*/React.createElement(TableSearch, {
        searchText: searchText,
        onSearch: this.handleSearch,
        onHide: this.hideSearch,
        options: options
      }) : typeof title !== 'string' ? title : /*#__PURE__*/React.createElement("div", {
        className: classes.titleRoot,
        "aria-hidden": 'true'
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h6",
        className: options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.titleText : classes.fullWidthTitleText
      }, title))), /*#__PURE__*/React.createElement("div", {
        className: options.responsive !== RESPONSIVE_FULL_WIDTH_NAME ? classes.actions : classes.fullWidthActions
      }, !(options.search === false || options.search === 'false' || options.searchAlwaysOpen === true) && /*#__PURE__*/React.createElement(Tooltip, {
        title: search,
        disableFocusListener: true
      }, /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": search,
        "data-testid": search + '-iconButton',
        ref: function ref(el) {
          return _this2.searchButton = el;
        },
        classes: {
          root: this.getActiveIcon(classes, 'search')
        },
        disabled: options.search === 'disabled',
        onClick: this.handleSearchIconClick
      }, /*#__PURE__*/React.createElement(SearchIconComponent, null))), !(options.download === false || options.download === 'false') && /*#__PURE__*/React.createElement(Tooltip, {
        title: downloadCsv
      }, /*#__PURE__*/React.createElement(IconButton, {
        "data-testid": downloadCsv.replace(/\s/g, '') + '-iconButton',
        "aria-label": downloadCsv,
        classes: {
          root: classes.icon
        },
        disabled: options.download === 'disabled',
        onClick: this.handleCSVDownload
      }, /*#__PURE__*/React.createElement(DownloadIconComponent, null))), !(options.print === false || options.print === 'false') && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(ReactToPrint, {
        content: function content() {
          return _this2.props.tableRef();
        }
      }, /*#__PURE__*/React.createElement(ReactToPrint.PrintContextConsumer, null, function (_ref2) {
        var handlePrint = _ref2.handlePrint;
        return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tooltip, {
          title: print
        }, /*#__PURE__*/React.createElement(IconButton, {
          "data-testid": print + '-iconButton',
          "aria-label": print,
          disabled: options.print === 'disabled',
          onClick: handlePrint,
          classes: {
            root: classes.icon
          }
        }, /*#__PURE__*/React.createElement(PrintIconComponent, null))));
      }))), !(options.viewColumns === false || options.viewColumns === 'false') && /*#__PURE__*/React.createElement(Popover, {
        refExit: _bindInstanceProperty(_context4 = this.setActiveIcon).call(_context4, null),
        classes: {
          closeIcon: classes.filterCloseIcon
        },
        hide: options.viewColumns === 'disabled',
        trigger: /*#__PURE__*/React.createElement(Tooltip, {
          title: viewColumns,
          disableFocusListener: true
        }, /*#__PURE__*/React.createElement(IconButton, {
          "data-testid": viewColumns + '-iconButton',
          "aria-label": viewColumns,
          classes: {
            root: this.getActiveIcon(classes, 'viewcolumns')
          },
          disabled: options.viewColumns === 'disabled',
          onClick: _bindInstanceProperty(_context5 = this.setActiveIcon).call(_context5, null, 'viewcolumns')
        }, /*#__PURE__*/React.createElement(ViewColumnIconComponent, null))),
        content: /*#__PURE__*/React.createElement(TableViewColComponent, {
          data: data,
          columns: columns,
          options: options,
          onColumnUpdate: toggleViewColumn,
          updateColumns: updateColumns,
          components: components
        })
      }), !(_filterInstanceProperty(options) === false || _filterInstanceProperty(options) === 'false') && /*#__PURE__*/React.createElement(Popover, {
        refExit: filterPopoverExit,
        hide: this.state.hideFilterPopover || _filterInstanceProperty(options) === 'disabled',
        classes: {
          paper: classes.filterPaper,
          closeIcon: classes.filterCloseIcon
        },
        trigger: /*#__PURE__*/React.createElement(Tooltip, {
          title: filterTable,
          disableFocusListener: true
        }, /*#__PURE__*/React.createElement(IconButton, {
          "data-testid": filterTable + '-iconButton',
          "aria-label": filterTable,
          classes: {
            root: this.getActiveIcon(classes, 'filter')
          },
          disabled: _filterInstanceProperty(options) === 'disabled',
          onClick: _bindInstanceProperty(_context6 = this.setActiveIcon).call(_context6, null, 'filter')
        }, /*#__PURE__*/React.createElement(FilterIconComponent, null))),
        content: /*#__PURE__*/React.createElement(TableFilterComponent, {
          customFooter: options.customFilterDialogFooter,
          columns: columns,
          options: options,
          filterList: filterList,
          filterData: filterData,
          onFilterUpdate: filterUpdate,
          onFilterReset: resetFilters,
          handleClose: closeFilterPopover,
          updateFilterByType: updateFilterByType,
          components: components
        })
      }), options.customToolbar && options.customToolbar({
        displayData: this.props.displayData
      })));
    }
  }]);
}(React.Component);
var DefaultTableToolbar = mui.withStyles(TableToolbar, defaultToolbarStyles, {
  name: 'MUIDataTableToolbar'
});

function _callSuper$2(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$2() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$2() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultToolbarSelectStyles = function defaultToolbarSelectStyles(theme) {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      flex: '1 1 100%',
      display: 'flex',
      position: 'relative',
      zIndex: 120,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: typeof theme.spacing === 'function' ? theme.spacing(1) : theme.spacing.unit,
      paddingBottom: typeof theme.spacing === 'function' ? theme.spacing(1) : theme.spacing.unit,
      '@media print': {
        display: 'none'
      }
    },
    title: {
      paddingLeft: '26px'
    },
    iconButton: {
      marginRight: '24px'
    },
    deleteIcon: {}
  };
};
var TableToolbarSelect = /*#__PURE__*/function (_React$Component) {
  function TableToolbarSelect() {
    var _context;
    var _this;
    _classCallCheck(this, TableToolbarSelect);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$2(this, TableToolbarSelect, _concatInstanceProperty(_context = []).call(_context, args));
    /**
     * @param {number[]} selectedRows Array of rows indexes that are selected, e.g. [0, 2] will select first and third rows in table
     */
    _defineProperty(_this, "handleCustomSelectedRows", function (selectedRows) {
      if (!_Array$isArray(selectedRows)) {
        throw new TypeError("\"selectedRows\" must be an \"array\", but it's \"".concat(_typeof(selectedRows), "\""));
      }
      if (_someInstanceProperty(selectedRows).call(selectedRows, function (row) {
        return typeof row !== 'number';
      })) {
        throw new TypeError("Array \"selectedRows\" must contain only numbers");
      }
      var options = _this.props.options;
      if (selectedRows.length > 1 && options.selectableRows === 'single') {
        throw new Error('Can not select more than one row when "selectableRows" is "single"');
      }
      _this.props.selectRowUpdate('custom', selectedRows);
    });
    return _this;
  }
  _inherits(TableToolbarSelect, _React$Component);
  return _createClass(TableToolbarSelect, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        onRowsDelete = _this$props.onRowsDelete,
        selectedRows = _this$props.selectedRows,
        options = _this$props.options,
        displayData = _this$props.displayData,
        _this$props$component = _this$props.components,
        components = _this$props$component === void 0 ? {} : _this$props$component;
      var textLabels = options.textLabels.selectedRows;
      var Tooltip = components.Tooltip || MuiTooltip;
      return /*#__PURE__*/React.createElement(Paper, {
        className: classes.root
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle1",
        className: classes.title
      }, selectedRows.data.length, " ", textLabels.text)), options.customToolbarSelect ? options.customToolbarSelect(selectedRows, displayData, this.handleCustomSelectedRows) : /*#__PURE__*/React.createElement(Tooltip, {
        title: textLabels.delete
      }, /*#__PURE__*/React.createElement(IconButton, {
        className: classes.iconButton,
        onClick: onRowsDelete,
        "aria-label": textLabels.deleteAria
      }, /*#__PURE__*/React.createElement(DeleteIcon, {
        className: classes.deleteIcon
      }))));
    }
  }]);
}(React.Component);
_defineProperty(TableToolbarSelect, "propTypes", {
  /** Options used to describe table */
  options: PropTypes.object.isRequired,
  /** Current row selected or not */
  rowSelected: PropTypes.bool,
  /** Callback to trigger selected rows delete */
  onRowsDelete: PropTypes.func,
  /** Extend the style applied to components */
  classes: PropTypes.object
});
var DefaultTableToolbarSelect = mui.withStyles(TableToolbarSelect, defaultToolbarSelectStyles, {
  name: 'MUIDataTableToolbarSelect'
});

/*
 * Default text labels.
 */
var getTextLabels = function getTextLabels() {
  return {
    body: {
      noMatch: 'Sorry, no matching records found',
      toolTip: 'Sort'
    },
    pagination: {
      next: 'Next Page',
      previous: 'Previous Page',
      rowsPerPage: 'Rows per page:',
      displayRows: 'of',
      jumpToPage: 'Jump to Page:'
    },
    toolbar: {
      search: 'Search',
      downloadCsv: 'Download CSV',
      print: 'Print',
      viewColumns: 'View Columns',
      filterTable: 'Filter Table'
    },
    filter: {
      all: 'All',
      title: 'FILTERS',
      reset: 'RESET'
    },
    viewColumns: {
      title: 'Show Columns',
      titleAria: 'Show/Hide Table Columns'
    },
    selectedRows: {
      text: 'row(s) selected',
      delete: 'Delete',
      deleteAria: 'Delete Selected Rows'
    }
  };
};

var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var load = function load(storageKey) {
  if (isBrowser) {
    return JSON.parse(window.localStorage.getItem(storageKey));
  } else if (storageKey !== undefined) {
    console.warn('storageKey support only on browser');
    return undefined;
  }
};

var _excluded$1 = ["selectedRows", "data", "displayData"];
var save = function save(storageKey, state) {
  state.selectedRows;
    state.data;
    state.displayData;
    var savedState = _objectWithoutProperties(state, _excluded$1);
  window.localStorage.setItem(storageKey, _JSON$stringify(savedState));
};

var _excluded = ["columns", "data", "displayData", "filterData"];
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context36, _context37; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context36 = ownKeys(Object(t), !0)).call(_context36, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context37 = ownKeys(Object(t))).call(_context37, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper$1(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
var defaultTableStyles = function defaultTableStyles(theme) {
  return {
    root: {
      '& .datatables-noprint': {
        '@media print': {
          display: 'none'
        }
      }
    },
    paper: {
      isolation: 'isolate'
    },
    paperResponsiveScrollFullHeightFullWidth: {
      position: 'absolute'
    },
    tableRoot: {
      outline: 'none'
    },
    responsiveBase: {
      overflow: 'auto',
      '@media print': {
        height: 'auto !important'
      }
    },
    // deprecated, but continuing support through v3.x
    responsiveScroll: {
      overflow: 'auto',
      height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollMaxHeight: {
      overflow: 'auto',
      height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollFullHeight: {
      height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveStacked: _defineProperty({
      overflow: 'auto'
    }, theme.breakpoints.down('md'), {
      overflow: 'hidden'
    }),
    // deprecated, but continuing support through v3.x
    responsiveStackedFullWidth: {},
    caption: {
      position: 'absolute',
      left: '-3000px'
    },
    liveAnnounce: {
      border: '0',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px'
    }
  };
};
var TABLE_LOAD = {
  INITIAL: 1,
  UPDATE: 2
};

// Populate this list with anything that might render in the toolbar to determine if we hide the toolbar
var TOOLBAR_ITEMS = ['title', 'filter', 'search', 'print', 'download', 'viewColumns', 'customToolbar'];
var hasToolbarItem = function hasToolbarItem(options, title) {
  options.title = title;
  return !isUndefined(find(TOOLBAR_ITEMS, function (i) {
    return options[i];
  }));
};

// Select Toolbar Placement options
var STP = {
  REPLACE: 'replace',
  ABOVE: 'above',
  NONE: 'none',
  ALWAYS: 'always'
};
var MUIDataTable = /*#__PURE__*/function (_React$Component) {
  function MUIDataTable(_props) {
    var _context22;
    var _this;
    _classCallCheck(this, MUIDataTable);
    _this = _callSuper$1(this, MUIDataTable, [_props]);
    _defineProperty(_this, "getDefaultOptions", function () {
      return {
        caseSensitive: false,
        consoleWarnings: true,
        disableToolbarSelect: false,
        download: true,
        downloadOptions: {
          filename: 'tableDownload.csv',
          separator: ','
        },
        draggableColumns: {
          enabled: false,
          transitionTime: 300
        },
        elevation: 4,
        enableNestedDataAccess: '',
        expandableRows: false,
        expandableRowsHeader: true,
        expandableRowsOnClick: false,
        filter: true,
        filterArrayFullMatch: true,
        filterType: 'dropdown',
        fixedHeader: true,
        fixedSelectColumn: true,
        pagination: true,
        print: true,
        resizableColumns: false,
        responsive: 'vertical',
        rowHover: true,
        //rowsPerPage: 10,
        rowsPerPageOptions: [10, 15, 100],
        search: true,
        selectableRows: 'multiple',
        selectableRowsHideCheckboxes: false,
        selectableRowsOnClick: false,
        selectableRowsHeader: true,
        serverSide: false,
        serverSideFilterList: null,
        setTableProps: function setTableProps() {
          return {};
        },
        sort: true,
        sortFilterList: true,
        tableBodyHeight: 'auto',
        tableBodyMaxHeight: null,
        // if set, it will override tableBodyHeight
        sortOrder: {},
        textLabels: getTextLabels(),
        viewColumns: true,
        selectToolbarPlacement: STP.REPLACE
      };
    });
    _defineProperty(_this, "warnDep", function (msg, consoleWarnings) {
      warnDeprecated(msg, _this.options.consoleWarnings);
    });
    _defineProperty(_this, "warnInfo", function (msg, consoleWarnings) {
      warnInfo(msg, _this.options.consoleWarnings);
    });
    _defineProperty(_this, "handleOptionDeprecation", function (props) {
      var _context, _context3;
      if (typeof _this.options.selectableRows === 'boolean') {
        _this.warnDep('Using a boolean for selectableRows has been deprecated. Please use string option: multiple | single | none');
        _this.options.selectableRows = _this.options.selectableRows ? 'multiple' : 'none';
      }
      if (_indexOfInstanceProperty(_context = ['standard', 'vertical', 'verticalAlways', 'simple']).call(_context, _this.options.responsive) === -1) {
        var _context2;
        if (_indexOfInstanceProperty(_context2 = ['scrollMaxHeight', 'scrollFullHeight', 'stacked', 'stackedFullWidth', 'scrollFullHeightFullWidth', 'scroll']).call(_context2, _this.options.responsive) !== -1) {
          _this.warnDep(_this.options.responsive + ' has been deprecated, but will still work in version 3.x. Please use string option: standard | vertical | simple. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
        } else {
          _this.warnInfo(_this.options.responsive + ' is not recognized as a valid input for responsive option. Please use string option: standard | vertical | simple. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
        }
      }
      if (_this.options.onRowsSelect) {
        _this.warnDep('onRowsSelect has been renamed onRowSelectionChange. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
      }
      if (_this.options.onRowsExpand) {
        _this.warnDep('onRowsExpand has been renamed onRowExpansionChange. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
      }
      if (_this.options.fixedHeaderOptions) {
        if (typeof _this.options.fixedHeaderOptions.yAxis !== 'undefined' && typeof _this.options.fixedHeader === 'undefined') {
          _this.options.fixedHeader = _this.options.fixedHeaderOptions.yAxis;
        }
        if (typeof _this.options.fixedHeaderOptions.xAxis !== 'undefined' && typeof _this.options.fixedSelectColumn === 'undefined') {
          _this.options.fixedSelectColumn = _this.options.fixedHeaderOptions.xAxis;
        }
        _this.warnDep('fixedHeaderOptions will still work but has been deprecated in favor of fixedHeader and fixedSelectColumn. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
      }
      if (_this.options.serverSideFilterList) {
        _this.warnDep('serverSideFilterList will still work but has been deprecated in favor of the confirmFilters option. See this example for details: https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-filters/index.js More info here: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
      }
      _mapInstanceProperty(_context3 = props.columns).call(_context3, function (c) {
        if (c.options && c.options.customFilterListRender) {
          _this.warnDep('The customFilterListRender option has been deprecated. It is being replaced by customFilterListOptions.render (Specify customFilterListOptions: { render: Function } in column options.)');
        }
      });
      if (_this.options.disableToolbarSelect === true) {
        _this.warnDep('disableToolbarSelect has been deprecated but will still work in version 3.x. It is being replaced by "selectToolbarPlacement"="none". More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
      }

      // only give this warning message in newer browsers
      if (_Object$values) {
        var _context4;
        if (_indexOfInstanceProperty(_context4 = _Object$values(STP)).call(_context4, _this.options.selectToolbarPlacement) === -1) {
          _this.warnDep('Invalid option value for selectToolbarPlacement. Please check the documentation: https://github.com/gregnb/mui-datatables#options');
        }
      }
    });
    _defineProperty(_this, "setTableAction", function (action) {
      if (typeof _this.options.onTableChange === 'function') {
        _this.options.onTableChange(action, _this.state);
      }
      if (_this.options.storageKey) {
        save(_this.options.storageKey, _this.state);
      }
    });
    _defineProperty(_this, "setTableInit", function (action) {
      if (typeof _this.options.onTableInit === 'function') {
        _this.options.onTableInit(action, _this.state);
      }
    });
    _defineProperty(_this, "setHeadCellRef", function (index, pos, el) {
      _this.draggableHeadCellRefs[index] = el;
      _this.resizeHeadCellRefs[pos] = el;
    });
    // must be arrow function on local field to refer to the correct instance when passed around
    // assigning it as arrow function in the JSX would cause hard to track re-render errors
    _defineProperty(_this, "getTableContentRef", function () {
      return _this.tableContent.current;
    });
    /*
     *  Build the source table data
     *
     *  newColumns - columns from the options object.
     *  prevColumns - columns object saved onto ths state.
     *  newColumnOrder - columnOrder from the options object.
     *  prevColumnOrder - columnOrder object saved onto the state.
     */
    _defineProperty(_this, "buildColumns", function (newColumns) {
      var prevColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var newColumnOrder = arguments.length > 2 ? arguments[2] : undefined;
      var prevColumnOrder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var columnData = [];
      var filterData = [];
      var filterList = [];
      var columnOrder = [];
      _forEachInstanceProperty(newColumns).call(newColumns, function (column, colIndex) {
        var columnOptions = {
          display: 'true',
          empty: false,
          filter: true,
          sort: true,
          print: true,
          searchable: true,
          download: true,
          viewColumns: true,
          sortCompare: null,
          sortThirdClickReset: false,
          sortDescFirst: false
        };
        columnOrder.push(colIndex);
        var options = _objectSpread({}, column.options);
        if (_typeof(column) === 'object') {
          if (options) {
            if (options.display !== undefined) {
              options.display = options.display.toString();
            }
            if (options.sortDirection === null || options.sortDirection) {
              _this.warnDep('The sortDirection column field has been deprecated. Please use the sortOrder option on the options object. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md');
            }
          }

          // remember stored version of display if not overwritten
          if (typeof options.display === 'undefined' && prevColumns[colIndex] && prevColumns[colIndex].name === column.name && prevColumns[colIndex].display) {
            options.display = prevColumns[colIndex].display;
          }
          columnOptions = _objectSpread(_objectSpread({
            name: column.name,
            label: column.label ? column.label : column.name
          }, columnOptions), options);
        } else {
          // remember stored version of display if not overwritten
          if (prevColumns[colIndex] && prevColumns[colIndex].display) {
            options.display = prevColumns[colIndex].display;
          }
          columnOptions = _objectSpread(_objectSpread(_objectSpread({}, columnOptions), options), {}, {
            name: column,
            label: column
          });
        }
        columnData.push(columnOptions);
        filterData[colIndex] = [];
        filterList[colIndex] = [];
      });
      if (_Array$isArray(newColumnOrder)) {
        columnOrder = newColumnOrder;
      } else if (_Array$isArray(prevColumnOrder) && _Array$isArray(newColumns) && _Array$isArray(prevColumns) && newColumns.length === prevColumns.length) {
        columnOrder = prevColumnOrder;
      }
      return {
        columns: columnData,
        filterData: filterData,
        filterList: filterList,
        columnOrder: columnOrder
      };
    });
    _defineProperty(_this, "transformData", function (columns, data) {
      var enableNestedDataAccess = _this.options.enableNestedDataAccess;
      var leaf = function leaf(obj, path) {
        var _context5;
        return _reduceInstanceProperty(_context5 = enableNestedDataAccess ? path.split(enableNestedDataAccess) : path.split()).call(_context5, function (value, el) {
          return value ? value[el] : undefined;
        }, obj);
      };
      var transformedData = _Array$isArray(data[0]) ? _mapInstanceProperty(data).call(data, function (row) {
        var i = -1;
        return _mapInstanceProperty(columns).call(columns, function (col) {
          if (!col.empty) i++;
          return col.empty ? undefined : row[i];
        });
      }) : _mapInstanceProperty(data).call(data, function (row) {
        return _mapInstanceProperty(columns).call(columns, function (col) {
          return leaf(row, col.name);
        });
      });
      return transformedData;
    });
    _defineProperty(_this, "hasSearchText", function (toSearch, toFind, caseSensitive) {
      var stack = toSearch.toString();
      var needle = toFind.toString();
      if (!caseSensitive) {
        needle = needle.toLowerCase();
        stack = stack.toLowerCase();
      }
      return _indexOfInstanceProperty(stack).call(stack, needle) >= 0;
    });
    _defineProperty(_this, "updateDataCol", function (row, index, value) {
      _this.setState(function (prevState) {
        var _context6, _context7;
        var changedData = cloneDeep(prevState.data);
        var filterData = cloneDeep(prevState.filterData);
        var tableMeta = _this.getTableMeta(row, index, row, prevState.columns[index], prevState.data, prevState, prevState.data);
        var funcResult = prevState.columns[index].customBodyRender(value, tableMeta);
        var filterValue = /*#__PURE__*/React.isValidElement(funcResult) && funcResult.props.value ? funcResult.props.value : prevState['data'][row][index];
        var prevFilterIndex = _indexOfInstanceProperty(_context6 = filterData[index]).call(_context6, filterValue);
        _spliceInstanceProperty(_context7 = filterData[index]).call(_context7, prevFilterIndex, 1, filterValue);
        changedData[row].data[index] = value;
        if (_this.options.sortFilterList) {
          var _context8;
          var comparator = getCollatorComparator();
          _sortInstanceProperty(_context8 = filterData[index]).call(_context8, comparator);
        }
        return {
          data: changedData,
          filterData: filterData,
          displayData: _this.getDisplayData(prevState.columns, changedData, prevState.filterList, prevState.searchText, null, _this.props)
        };
      });
    });
    _defineProperty(_this, "getTableMeta", function (rowIndex, colIndex, rowData, columnData, tableData, curState, currentTableData) {
      curState.columns;
        curState.data;
        curState.displayData;
        curState.filterData;
        var tableState = _objectWithoutProperties(curState, _excluded);
      return {
        rowIndex: rowIndex,
        columnIndex: colIndex,
        columnData: columnData,
        rowData: rowData,
        tableData: tableData,
        tableState: tableState,
        currentTableData: currentTableData
      };
    });
    _defineProperty(_this, "toggleViewColumn", function (index) {
      _this.setState(function (prevState) {
        var columns = cloneDeep(prevState.columns);
        columns[index].display = columns[index].display === 'true' ? 'false' : 'true';
        return {
          columns: columns
        };
      }, function () {
        _this.setTableAction('viewColumnsChange');
        var cb = _this.options.onViewColumnsChange || _this.options.onColumnViewChange;
        if (cb) {
          cb(_this.state.columns[index].name, _this.state.columns[index].display === 'true' ? 'add' : 'remove');
        }
      });
    });
    _defineProperty(_this, "updateColumns", function (newColumns) {
      _this.setState(function (prevState) {
        return {
          columns: newColumns
        };
      }, function () {
        _this.setTableAction('viewColumnsChange');
        var cb = _this.options.onViewColumnsChange || _this.options.onColumnViewChange;
        if (cb) {
          cb(null, 'update', newColumns);
        }
      });
    });
    _defineProperty(_this, "toggleSortColumn", function (index) {
      _this.setState(function (prevState) {
        var _context9;
        var columns = cloneDeep(prevState.columns);
        var data = prevState.data;
        var newOrder = columns[index].sortDescFirst ? 'desc' : 'asc'; // default

        var sequenceOrder = ['asc', 'desc'];
        if (columns[index].sortDescFirst) {
          sequenceOrder = ['desc', 'asc'];
        }
        if (columns[index].sortThirdClickReset) {
          sequenceOrder.push('none');
        }
        if (columns[index].name === _this.state.sortOrder.name) {
          var pos = _indexOfInstanceProperty(sequenceOrder).call(sequenceOrder, _this.state.sortOrder.direction);
          if (pos !== -1) {
            pos++;
            if (pos >= sequenceOrder.length) pos = 0;
            newOrder = sequenceOrder[pos];
          }
        }
        var newSortOrder = {
          name: columns[index].name,
          direction: newOrder
        };
        var orderLabel = _this.getSortDirectionLabel(newSortOrder);
        var announceText = _concatInstanceProperty(_context9 = "Table now sorted by ".concat(columns[index].name, " : ")).call(_context9, orderLabel);
        var newState = {
          columns: columns,
          announceText: announceText,
          activeColumn: index
        };
        if (_this.options.serverSide) {
          newState = _objectSpread(_objectSpread({}, newState), {}, {
            data: prevState.data,
            displayData: prevState.displayData,
            selectedRows: prevState.selectedRows,
            sortOrder: newSortOrder
          });
        } else {
          var sortedData = _this.sortTable(data, index, newOrder, columns[index].sortCompare);
          newState = _objectSpread(_objectSpread({}, newState), {}, {
            data: sortedData.data,
            displayData: _this.getDisplayData(columns, sortedData.data, prevState.filterList, prevState.searchText, null, _this.props),
            selectedRows: sortedData.selectedRows,
            sortOrder: newSortOrder,
            previousSelectedRow: null
          });
        }
        return newState;
      }, function () {
        _this.setTableAction('sort');
        if (_this.options.onColumnSortChange) {
          _this.options.onColumnSortChange(_this.state.sortOrder.name, _this.state.sortOrder.direction);
        }
      });
    });
    _defineProperty(_this, "changeRowsPerPage", function (rows) {
      var rowCount = _this.options.count || _this.state.displayData.length;
      _this.setState(function () {
        return {
          rowsPerPage: rows,
          page: getPageValue(rowCount, rows, _this.state.page)
        };
      }, function () {
        _this.setTableAction('changeRowsPerPage');
        if (_this.options.onChangeRowsPerPage) {
          _this.options.onChangeRowsPerPage(_this.state.rowsPerPage);
        }
      });
    });
    _defineProperty(_this, "changePage", function (page) {
      _this.setState(function () {
        return {
          page: page
        };
      }, function () {
        _this.setTableAction('changePage');
        if (_this.options.onChangePage) {
          _this.options.onChangePage(_this.state.page);
        }
      });
    });
    _defineProperty(_this, "searchClose", function () {
      _this.setState(function (prevState) {
        return {
          searchText: null,
          displayData: _this.options.serverSide ? prevState.displayData : _this.getDisplayData(prevState.columns, prevState.data, prevState.filterList, null, null, _this.props)
        };
      }, function () {
        _this.setTableAction('search');
        if (_this.options.onSearchChange) {
          _this.options.onSearchChange(_this.state.searchText);
        }
      });
    });
    _defineProperty(_this, "searchTextUpdate", function (text) {
      _this.setState(function (prevState) {
        return {
          searchText: text && text.length ? text : null,
          page: 0,
          displayData: _this.options.serverSide ? prevState.displayData : _this.getDisplayData(prevState.columns, prevState.data, prevState.filterList, text, null, _this.props)
        };
      }, function () {
        _this.setTableAction('search');
        if (_this.options.onSearchChange) {
          _this.options.onSearchChange(_this.state.searchText);
        }
      });
    });
    _defineProperty(_this, "resetFilters", function () {
      _this.setState(function (prevState) {
        var _context10;
        var filterList = _mapInstanceProperty(_context10 = prevState.columns).call(_context10, function () {
          return [];
        });
        return {
          filterList: filterList,
          displayData: _this.options.serverSide ? prevState.displayData : _this.getDisplayData(prevState.columns, prevState.data, filterList, prevState.searchText, null, _this.props)
        };
      }, function () {
        _this.setTableAction('resetFilters');
        if (_this.options.onFilterChange) {
          _this.options.onFilterChange(null, _this.state.filterList, 'reset', null);
        }
      });
    });
    _defineProperty(_this, "updateFilterByType", function (filterList, index, value, type, customUpdate) {
      var _context11, _context12, _context13;
      var filterPos = _findIndexInstanceProperty(_context11 = filterList[index]).call(_context11, function (filter) {
        return isEqual(filter, value);
      });
      switch (type) {
        case 'checkbox':
          filterPos >= 0 ? _spliceInstanceProperty(_context12 = filterList[index]).call(_context12, filterPos, 1) : filterList[index].push(value);
          break;
        case 'chip':
          filterPos >= 0 ? _spliceInstanceProperty(_context13 = filterList[index]).call(_context13, filterPos, 1) : filterList[index].push(value);
          break;
        case 'multiselect':
          filterList[index] = value === '' ? [] : value;
          break;
        case 'dropdown':
          filterList[index] = value;
          break;
        case 'custom':
          if (customUpdate) {
            filterList = customUpdate(filterList, filterPos, index);
          } else {
            filterList[index] = value;
          }
          break;
        default:
          filterList[index] = filterPos >= 0 || value === '' ? [] : [value];
      }
    });
    _defineProperty(_this, "filterUpdate", function (index, value, column, type, customUpdate, next) {
      _this.setState(function (prevState) {
        var filterList = cloneDeep(prevState.filterList);
        _this.updateFilterByType(filterList, index, value, type, customUpdate);
        return {
          page: 0,
          filterList: filterList,
          displayData: _this.options.serverSide ? prevState.displayData : _this.getDisplayData(prevState.columns, prevState.data, filterList, prevState.searchText, null, _this.props),
          previousSelectedRow: null
        };
      }, function () {
        _this.setTableAction('filterChange');
        if (_this.options.onFilterChange) {
          _this.options.onFilterChange(column, _this.state.filterList, type, index, _this.state.displayData);
        }
        next && next(_this.state.filterList);
      });
    });
    // Collapses or expands all expanded rows
    _defineProperty(_this, "toggleAllExpandableRows", function () {
      var expandedRowsData = _toConsumableArray(_this.state.expandedRows.data);
      var isRowExpandable = _this.options.isRowExpandable;
      var affecttedRows = [];
      if (expandedRowsData.length > 0) {
        // collapse all
        for (var ii = expandedRowsData.length - 1; ii >= 0; ii--) {
          var item = expandedRowsData[ii];
          if (!isRowExpandable || isRowExpandable && isRowExpandable(item.dataIndex, _this.state.expandedRows)) {
            affecttedRows.push(_spliceInstanceProperty(expandedRowsData).call(expandedRowsData, ii, 1));
          }
        }
      } else {
        // expand all
        for (var _ii = 0; _ii < _this.state.data.length; _ii++) {
          var _item = _this.state.data[_ii];
          if (!isRowExpandable || isRowExpandable && isRowExpandable(_item.dataIndex, _this.state.expandedRows)) {
            if (_this.state.expandedRows.lookup[_item.index] !== true) {
              var newItem = {
                index: _ii,
                dataIndex: _item.index
              };
              expandedRowsData.push(newItem);
              affecttedRows.push(newItem);
            }
          }
        }
      }
      _this.setState({
        expandedRows: {
          lookup: buildMap(expandedRowsData),
          data: expandedRowsData
        }
      }, function () {
        _this.setTableAction('expandRow');
        if (_this.options.onRowExpansionChange) {
          var _context14;
          _this.options.onRowExpansionChange(affecttedRows, _this.state.expandedRows.data, _mapInstanceProperty(_context14 = _this.state.expandedRows.data).call(_context14, function (item) {
            return item.dataIndex;
          }));
        }
      });
    });
    _defineProperty(_this, "areAllRowsExpanded", function () {
      return _this.state.expandedRows.data.length === _this.state.data.length;
    });
    _defineProperty(_this, "updateColumnOrder", function (columnOrder, columnIndex, newPosition) {
      _this.setState(function (prevState) {
        return {
          columnOrder: columnOrder
        };
      }, function () {
        _this.setTableAction('columnOrderChange');
        if (_this.options.onColumnOrderChange) {
          _this.options.onColumnOrderChange(_this.state.columnOrder, columnIndex, newPosition);
        }
      });
    });
    _defineProperty(_this, "selectRowDelete", function () {
      var _this$state = _this.state,
        selectedRows = _this$state.selectedRows,
        data = _this$state.data,
        filterList = _this$state.filterList;
      var selectedMap = buildMap(selectedRows.data);
      var cleanRows = _filterInstanceProperty(data).call(data, function (_ref) {
        var index = _ref.index;
        return !selectedMap[index];
      });
      if (_this.options.onRowsDelete) {
        if (_this.options.onRowsDelete(selectedRows, _mapInstanceProperty(cleanRows).call(cleanRows, function (ii) {
          return ii.data;
        })) === false) return;
      }
      _this.setTableData({
        columns: _this.props.columns,
        data: cleanRows,
        options: {
          filterList: filterList
        }
      }, TABLE_LOAD.UPDATE, true, function () {
        _this.setTableAction('rowDelete');
      });
    });
    _defineProperty(_this, "toggleExpandRow", function (row) {
      var dataIndex = row.dataIndex;
      var isRowExpandable = _this.options.isRowExpandable;
      var expandedRows = _this.state.expandedRows;
      var expandedRowsData = _toConsumableArray(expandedRows.data);
      var shouldCollapseExpandedRow = false;
      var hasRemovedRow = false;
      var removedRow = [];
      for (var cIndex = 0; cIndex < expandedRowsData.length; cIndex++) {
        if (expandedRowsData[cIndex].dataIndex === dataIndex) {
          shouldCollapseExpandedRow = true;
          break;
        }
      }
      if (shouldCollapseExpandedRow) {
        if (isRowExpandable && isRowExpandable(dataIndex, expandedRows) || !isRowExpandable) {
          removedRow = _spliceInstanceProperty(expandedRowsData).call(expandedRowsData, cIndex, 1);
          hasRemovedRow = true;
        }
      } else {
        if (isRowExpandable && isRowExpandable(dataIndex, expandedRows)) expandedRowsData.push(row);else if (!isRowExpandable) expandedRowsData.push(row);
      }
      _this.setState({
        curExpandedRows: hasRemovedRow ? removedRow : [row],
        expandedRows: {
          lookup: buildMap(expandedRowsData),
          data: expandedRowsData
        }
      }, function () {
        _this.setTableAction('rowExpansionChange');
        if (_this.options.onRowExpansionChange || _this.options.onRowsExpand) {
          var expandCallback = _this.options.onRowExpansionChange || _this.options.onRowsExpand;
          expandCallback(_this.state.curExpandedRows, _this.state.expandedRows.data);
        }
      });
    });
    _defineProperty(_this, "selectRowUpdate", function (type, value) {
      var shiftAdjacentRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      // safety check
      var selectableRows = _this.options.selectableRows;
      if (selectableRows === 'none') {
        return;
      }
      if (type === 'head') {
        var isRowSelectable = _this.options.isRowSelectable;
        _this.setState(function (prevState) {
          var displayData = prevState.displayData,
            prevSelectedRows = prevState.selectedRows;
          var selectedRowsLen = prevState.selectedRows.data.length;
          var isDeselect = selectedRowsLen === displayData.length || selectedRowsLen < displayData.length && selectedRowsLen > 0;
          var selectedRows = _reduceInstanceProperty(displayData).call(displayData, function (arr, d, i) {
            var selected = isRowSelectable ? isRowSelectable(displayData[i].dataIndex, prevSelectedRows) : true;
            selected && arr.push({
              index: i,
              dataIndex: displayData[i].dataIndex
            });
            return arr;
          }, []);
          var newRows = _toConsumableArray(selectedRows);
          var selectedMap = buildMap(newRows);

          // if the select toolbar is disabled, the rules are a little different
          if (_this.options.selectToolbarPlacement === STP.NONE) {
            if (selectedRowsLen > displayData.length) {
              isDeselect = true;
            } else {
              for (var ii = 0; ii < displayData.length; ii++) {
                if (!selectedMap[displayData[ii].dataIndex]) {
                  isDeselect = true;
                }
              }
            }
          }
          if (isDeselect) {
            var _context15;
            newRows = _filterInstanceProperty(_context15 = prevState.selectedRows.data).call(_context15, function (_ref2) {
              var dataIndex = _ref2.dataIndex;
              return !selectedMap[dataIndex];
            });
            selectedMap = buildMap(newRows);
          }
          return {
            curSelectedRows: newRows,
            selectedRows: {
              data: newRows,
              lookup: selectedMap
            },
            previousSelectedRow: null
          };
        }, function () {
          _this.setTableAction('rowSelectionChange');
          if (_this.options.onRowSelectionChange) {
            var _context16;
            _this.options.onRowSelectionChange(_this.state.curSelectedRows, _this.state.selectedRows.data, _mapInstanceProperty(_context16 = _this.state.selectedRows.data).call(_context16, function (item) {
              return item.dataIndex;
            }));
          } else if (_this.options.onRowsSelect) {
            var _context17;
            _this.options.onRowsSelect(_this.state.curSelectedRows, _this.state.selectedRows.data, _mapInstanceProperty(_context17 = _this.state.selectedRows.data).call(_context17, function (item) {
              return item.dataIndex;
            }));
          }
        });
      } else if (type === 'cell') {
        _this.setState(function (prevState) {
          var dataIndex = value.dataIndex;
          var selectedRows = _toConsumableArray(prevState.selectedRows.data);
          var rowPos = -1;
          for (var cIndex = 0; cIndex < selectedRows.length; cIndex++) {
            if (selectedRows[cIndex].dataIndex === dataIndex) {
              rowPos = cIndex;
              break;
            }
          }
          if (rowPos >= 0) {
            _spliceInstanceProperty(selectedRows).call(selectedRows, rowPos, 1);

            // handle rows affected by shift+click
            if (shiftAdjacentRows.length > 0) {
              var shiftAdjacentMap = buildMap(shiftAdjacentRows);
              for (var _cIndex = selectedRows.length - 1; _cIndex >= 0; _cIndex--) {
                if (shiftAdjacentMap[selectedRows[_cIndex].dataIndex]) {
                  _spliceInstanceProperty(selectedRows).call(selectedRows, _cIndex, 1);
                }
              }
            }
          } else if (selectableRows === 'single') {
            selectedRows = [value];
          } else {
            // multiple
            selectedRows.push(value);

            // handle rows affected by shift+click
            if (shiftAdjacentRows.length > 0) {
              var selectedMap = buildMap(selectedRows);
              _forEachInstanceProperty(shiftAdjacentRows).call(shiftAdjacentRows, function (aRow) {
                if (!selectedMap[aRow.dataIndex]) {
                  selectedRows.push(aRow);
                }
              });
            }
          }
          return {
            selectedRows: {
              lookup: buildMap(selectedRows),
              data: selectedRows
            },
            previousSelectedRow: value
          };
        }, function () {
          _this.setTableAction('rowSelectionChange');
          if (_this.options.onRowSelectionChange) {
            var _context18;
            _this.options.onRowSelectionChange([value], _this.state.selectedRows.data, _mapInstanceProperty(_context18 = _this.state.selectedRows.data).call(_context18, function (item) {
              return item.dataIndex;
            }));
          } else if (_this.options.onRowsSelect) {
            var _context19;
            _this.options.onRowsSelect([value], _this.state.selectedRows.data, _mapInstanceProperty(_context19 = _this.state.selectedRows.data).call(_context19, function (item) {
              return item.dataIndex;
            }));
          }
        });
      } else if (type === 'custom') {
        var displayData = _this.state.displayData;
        var data = _mapInstanceProperty(value).call(value, function (row) {
          return {
            index: row,
            dataIndex: displayData[row].dataIndex
          };
        });
        var lookup = buildMap(data);
        _this.setState({
          selectedRows: {
            data: data,
            lookup: lookup
          },
          previousSelectedRow: null
        }, function () {
          _this.setTableAction('rowSelectionChange');
          if (_this.options.onRowSelectionChange) {
            var _context20;
            _this.options.onRowSelectionChange(_this.state.selectedRows.data, _this.state.selectedRows.data, _mapInstanceProperty(_context20 = _this.state.selectedRows.data).call(_context20, function (item) {
              return item.dataIndex;
            }));
          } else if (_this.options.onRowsSelect) {
            var _context21;
            _this.options.onRowsSelect(_this.state.selectedRows.data, _this.state.selectedRows.data, _mapInstanceProperty(_context21 = _this.state.selectedRows.data).call(_context21, function (item) {
              return item.dataIndex;
            }));
          }
        });
      }
    });
    _this.tableRef = /*#__PURE__*/React.createRef();
    _this.tableContent = /*#__PURE__*/React.createRef();
    _this.draggableHeadCellRefs = {};
    _this.resizeHeadCellRefs = {};
    _this.timers = {};
    _this.setHeadResizeable = function () {};
    _this.updateDividers = function () {};
    var defaultState = {
      activeColumn: null,
      announceText: null,
      count: 0,
      columns: [],
      expandedRows: {
        data: [],
        lookup: {}
      },
      data: [],
      displayData: [],
      filterData: [],
      filterList: [],
      page: 0,
      previousSelectedRow: null,
      rowsPerPage: 10,
      searchProps: {},
      searchText: null,
      selectedRows: {
        data: [],
        lookup: {}
      },
      showResponsive: false,
      sortOrder: {}
    };
    _this.mergeDefaultOptions(_props);
    var restoredState = load(_props.options.storageKey);
    _this.state = _Object$assign(defaultState, restoredState ? restoredState : _this.getInitTableOptions());
    _this.setTableData = _bindInstanceProperty(_context22 = _this.setTableData).call(_context22, _this);
    _this.setTableData(_props, TABLE_LOAD.INITIAL, true, null, true);
    return _this;
  }
  _inherits(MUIDataTable, _React$Component);
  return _createClass(MUIDataTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setHeadResizeable(this.resizeHeadCellRefs, this.tableRef);

      // When we have a search, we must reset page to view it unless on serverSide since paging is handled by the user.
      if (this.props.options.searchText && !this.props.options.serverSide) this.setState({
        page: 0
      });
      this.setTableInit('tableInitialized');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;
      if (this.props.data !== prevProps.data || this.props.columns !== prevProps.columns || this.props.options !== prevProps.options) {
        this.updateOptions(this.options, this.props);
        var didDataUpdate = this.props.data !== prevProps.data;
        if (this.props.data && prevProps.data) {
          didDataUpdate = didDataUpdate && this.props.data.length === prevProps.data.length;
        }
        this.setTableData(this.props, TABLE_LOAD.INITIAL, didDataUpdate, function () {
          _this2.setTableAction('propsUpdate');
        });
      }
      if (this.props.options.searchText !== prevProps.options.searchText && !this.props.options.serverSide) {
        // When we have a search, we must reset page to view it unless on serverSide since paging is handled by the user.
        this.setState({
          page: 0
        });
      }
      if (this.options.resizableColumns === true || this.options.resizableColumns && this.options.resizableColumns.enabled) {
        this.setHeadResizeable(this.resizeHeadCellRefs, this.tableRef);
        this.updateDividers();
      }
    }
  }, {
    key: "updateOptions",
    value: function updateOptions(options, props) {
      // set backwards compatibility options
      if (props.options.disableToolbarSelect === true && props.options.selectToolbarPlacement === undefined) {
        // if deprecated option disableToolbarSelect is set and selectToolbarPlacement is default then use it
        props.options.selectToolbarPlacement = STP.NONE;
      }

      // provide default tableId when no tableId has been passed as prop
      if (!props.options.tableId) {
        props.options.tableId = (Math.random() + '').replace(/\./, '');
      }
      this.options = assignwith(options, props.options, function (objValue, srcValue, key) {
        // Merge any default options that are objects, as they will be overwritten otherwise
        if (key === 'textLabels' || key === 'downloadOptions') return merge(objValue, srcValue);
        return;
      });
      this.handleOptionDeprecation(props);
    }
  }, {
    key: "mergeDefaultOptions",
    value:
    /*
     * React currently does not support deep merge for defaultProps. Objects are overwritten
     */
    function mergeDefaultOptions(props) {
      var defaultOptions = this.getDefaultOptions();
      var theProps = _Object$assign({}, props);
      theProps.options = theProps.options || {};
      this.updateOptions(defaultOptions, theProps);
    }
  }, {
    key: "validateOptions",
    value: function validateOptions(options) {
      var _context23;
      if (options.serverSide && options.onTableChange === undefined) {
        throw Error('onTableChange callback must be provided when using serverSide option');
      }
      if (options.expandableRows && options.renderExpandableRow === undefined) {
        throw Error('renderExpandableRow must be provided when using expandableRows option');
      }
      if (options.rowsSelected && _Array$isArray(options.rowsSelected) && _someInstanceProperty(_context23 = options.rowsSelected).call(_context23, isNaN)) {
        warnInfo('When using the rowsSelected option, must be provided an array of numbers only.');
      }
    }
  }, {
    key: "getInitTableOptions",
    value: function getInitTableOptions() {
      var _this3 = this;
      var optionNames = ['rowsPerPage', 'page', 'rowsSelected', 'rowsPerPageOptions'];
      var optState = _reduceInstanceProperty(optionNames).call(optionNames, function (acc, cur) {
        if (_this3.options[cur] !== undefined) {
          acc[cur] = _this3.options[cur];
        }
        return acc;
      }, {});
      this.validateOptions(optState);
      return optState;
    }
  }, {
    key: "setTableData",
    value: function setTableData(props, status, dataUpdated) {
      var _this4 = this;
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
      var fromConstructor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var tableData = [];
      var _this$buildColumns = this.buildColumns(props.columns, this.state.columns, this.options.columnOrder, this.state.columnOrder),
        columns = _this$buildColumns.columns,
        filterData = _this$buildColumns.filterData,
        filterList = _this$buildColumns.filterList,
        columnOrder = _this$buildColumns.columnOrder;
      var sortIndex = null;
      var sortDirection = 'none';
      var tableMeta;
      var sortOrder;
      if (this.options.sortOrder && this.options.sortOrder.direction && this.options.sortOrder.name) {
        sortOrder = _Object$assign({}, this.options.sortOrder);
      } else {
        sortOrder = _Object$assign({}, this.state.sortOrder);

        // if no sortOrder, check and see if there's a sortDirection on one of the columns (deprecation notice for this is given above)
        if (!sortOrder.direction) {
          var _context24;
          _forEachInstanceProperty(_context24 = props.columns).call(_context24, function (column, colIndex) {
            if (column.options && (column.options.sortDirection === 'asc' || column.options.sortDirection === 'desc')) {
              sortOrder.name = column.name;
              sortOrder.sortDirection = column.sortDirection;
            }
          });
        }
      }
      var data = status === TABLE_LOAD.INITIAL ? this.transformData(columns, props.data) : props.data;
      var searchText = status === TABLE_LOAD.INITIAL ? this.options.searchText : null;
      if (typeof this.options.searchText === 'undefined' && typeof this.state.searchText !== 'undefined') {
        searchText = this.state.searchText;
      }
      var rowsPerPage = this.state.rowsPerPage;
      if (typeof this.options.rowsPerPage === 'number') {
        rowsPerPage = this.options.rowsPerPage;
      }
      var page = this.state.page;
      if (typeof this.options.page === 'number') {
        page = this.options.page;
      }
      _forEachInstanceProperty(columns).call(columns, function (column, colIndex) {
        for (var rowIndex = 0; rowIndex < data.length; rowIndex++) {
          var value = status === TABLE_LOAD.INITIAL ? data[rowIndex][colIndex] : data[rowIndex].data[colIndex];
          if (typeof tableData[rowIndex] === 'undefined') {
            tableData.push({
              index: status === TABLE_LOAD.INITIAL ? rowIndex : data[rowIndex].index,
              data: status === TABLE_LOAD.INITIAL ? data[rowIndex] : data[rowIndex].data
            });
          }
          if (_filterInstanceProperty(column) !== false) {
            var _context25;
            if (typeof column.customBodyRender === 'function') {
              var rowData = tableData[rowIndex].data;
              tableMeta = _this4.getTableMeta(rowIndex, colIndex, rowData, column, data, _this4.state, tableData);
              var funcResult = column.customBodyRender(value, tableMeta);
              if (/*#__PURE__*/React.isValidElement(funcResult) && funcResult.props.value) {
                value = funcResult.props.value;
              } else if (typeof funcResult === 'string') {
                value = funcResult;
              }
            }
            if (_typeof(value) === 'object' && !_Array$isArray(value) && value !== null) {
              // it's extremely rare but possible to create an object without a toString method, ex: var x = Object.create(null);
              // so this check has to be made
              value = value.toString ? value.toString() : '';
            }
            if (_indexOfInstanceProperty(_context25 = filterData[colIndex]).call(_context25, value) < 0 && !_Array$isArray(value)) {
              filterData[colIndex].push(value);
            } else if (_Array$isArray(value)) {
              _forEachInstanceProperty(value).call(value, function (element) {
                var _context26;
                var elmVal;
                if (_typeof(element) === 'object' && element !== null || typeof element === 'function') {
                  elmVal = element.toString ? element.toString() : '';
                } else {
                  elmVal = element;
                }
                if (_indexOfInstanceProperty(_context26 = filterData[colIndex]).call(_context26, elmVal) < 0) {
                  filterData[colIndex].push(elmVal);
                }
              });
            }
          }
        }
        if (column.filterOptions) {
          if (_Array$isArray(column.filterOptions)) {
            filterData[colIndex] = cloneDeep(column.filterOptions);
            _this4.warnDep('filterOptions must now be an object. see https://github.com/gregnb/mui-datatables/tree/master/examples/customize-filter example');
          } else if (_Array$isArray(column.filterOptions.names)) {
            filterData[colIndex] = cloneDeep(column.filterOptions.names);
          }
        }
        if (column.filterList) {
          filterList[colIndex] = cloneDeep(column.filterList);
        } else if (_this4.state.filterList && _this4.state.filterList[colIndex] && _this4.state.filterList[colIndex].length > 0) {
          filterList[colIndex] = cloneDeep(_this4.state.filterList[colIndex]);
        }
        if (_this4.options.sortFilterList) {
          var _context27;
          var comparator = getCollatorComparator();
          _sortInstanceProperty(_context27 = filterData[colIndex]).call(_context27, comparator);
        }
        if (column.name === sortOrder.name) {
          sortDirection = sortOrder.direction;
          sortIndex = colIndex;
        }
      });
      var selectedRowsData = {
        data: [],
        lookup: {}
      };
      var expandedRowsData = {
        data: [],
        lookup: {}
      };
      {
        // Multiple row selection customization
        if (this.options.rowsSelected && this.options.rowsSelected.length && this.options.selectableRows === 'multiple') {
          var _context28, _context29;
          _forEachInstanceProperty(_context28 = _filterInstanceProperty(_context29 = this.options.rowsSelected).call(_context29, function (selectedRowIndex) {
            return selectedRowIndex === 0 || Number(selectedRowIndex) && selectedRowIndex > 0;
          })).call(_context28, function (row) {
            var rowPos = row;
            for (var cIndex = 0; cIndex < _this4.state.displayData.length; cIndex++) {
              if (_this4.state.displayData[cIndex].dataIndex === row) {
                rowPos = cIndex;
                break;
              }
            }
            selectedRowsData.data.push({
              index: rowPos,
              dataIndex: row
            });
            selectedRowsData.lookup[row] = true;
          });

          // Single row selection customization
        } else if (this.options.rowsSelected && this.options.rowsSelected.length === 1 && this.options.selectableRows === 'single') {
          var rowPos = this.options.rowsSelected[0];
          for (var cIndex = 0; cIndex < this.state.displayData.length; cIndex++) {
            if (this.state.displayData[cIndex].dataIndex === this.options.rowsSelected[0]) {
              rowPos = cIndex;
              break;
            }
          }
          selectedRowsData.data.push({
            index: rowPos,
            dataIndex: this.options.rowsSelected[0]
          });
          selectedRowsData.lookup[this.options.rowsSelected[0]] = true;
        } else if (this.options.rowsSelected && this.options.rowsSelected.length > 1 && this.options.selectableRows === 'single') {
          console.error('Multiple values provided for selectableRows, but selectableRows set to "single". Either supply only a single value or use "multiple".');
        } else if (typeof this.options.rowsSelected === 'undefined' && dataUpdated === false) {
          if (this.state.selectedRows) {
            selectedRowsData = _Object$assign({}, this.state.selectedRows);
          }
        }
        if (this.options.rowsExpanded && this.options.rowsExpanded.length && this.options.expandableRows) {
          var _context30;
          _forEachInstanceProperty(_context30 = this.options.rowsExpanded).call(_context30, function (row) {
            var rowPos = row;
            for (var _cIndex2 = 0; _cIndex2 < _this4.state.displayData.length; _cIndex2++) {
              if (_this4.state.displayData[_cIndex2].dataIndex === row) {
                rowPos = _cIndex2;
                break;
              }
            }
            expandedRowsData.data.push({
              index: rowPos,
              dataIndex: row
            });
            expandedRowsData.lookup[row] = true;
          });
        } else if (typeof this.options.rowsExpanded === 'undefined' && dataUpdated === false && this.state.expandedRows) {
          expandedRowsData = _Object$assign({}, this.state.expandedRows);
        }
      }
      if (!this.options.serverSide && sortIndex !== null) {
        var sortedData = this.sortTable(tableData, sortIndex, sortDirection, columns[sortIndex].sortCompare);
        tableData = sortedData.data;
      }

      /* set source data and display Data set source set */
      var stateUpdates = {
        columns: columns,
        filterData: filterData,
        filterList: filterList,
        searchText: searchText,
        selectedRows: selectedRowsData,
        expandedRows: expandedRowsData,
        count: this.options.count,
        data: tableData,
        sortOrder: sortOrder,
        rowsPerPage: rowsPerPage,
        page: page,
        displayData: this.getDisplayData(columns, tableData, filterList, searchText, tableMeta, props),
        columnOrder: columnOrder
      };
      if (fromConstructor) {
        this.state = _Object$assign({}, this.state, stateUpdates);
      } else {
        this.setState(stateUpdates, callback);
      }
    }

    /*
     *  Build the table data used to display to the user (ie: after filter/search applied)
     */
  }, {
    key: "computeDisplayRow",
    value: function computeDisplayRow(columns, row, rowIndex, filterList, searchText, dataForTableMeta, options, props, currentTableData) {
      var _this5 = this;
      var isFiltered = false;
      var isSearchFound = false;
      var displayRow = [];
      var _loop = function _loop() {
        var columnDisplay = row[index];
        var columnValue = row[index];
        var column = columns[index];
        if (column.customBodyRenderLite) {
          displayRow.push(column.customBodyRenderLite);
        } else if (column.customBodyRender) {
          var _context31;
          var tableMeta = _this5.getTableMeta(rowIndex, index, row, column, dataForTableMeta, _objectSpread(_objectSpread({}, _this5.state), {}, {
            filterList: filterList,
            searchText: searchText
          }), currentTableData);
          var funcResult = column.customBodyRender(columnValue, tableMeta, _bindInstanceProperty(_context31 = _this5.updateDataCol).call(_context31, null, rowIndex, index));
          columnDisplay = funcResult;

          /* drill down to get the value of a cell */
          columnValue = typeof funcResult === 'string' || !funcResult ? funcResult : funcResult.props && funcResult.props.value ? funcResult.props.value : columnValue;
          displayRow.push(columnDisplay);
        } else {
          displayRow.push(columnDisplay);
        }
        var columnVal = columnValue === null || columnValue === undefined ? '' : columnValue.toString();
        var filterVal = filterList[index];
        var caseSensitive = options.caseSensitive;
        var filterType = column.filterType || options.filterType;
        if (filterVal.length || filterType === 'custom') {
          if (column.filterOptions && column.filterOptions.logic) {
            if (column.filterOptions.logic(columnValue, filterVal, row)) isFiltered = true;
          } else if (filterType === 'textField' && !_this5.hasSearchText(columnVal, filterVal, caseSensitive)) {
            isFiltered = true;
          } else if (filterType !== 'textField' && _Array$isArray(columnValue) === false && _indexOfInstanceProperty(filterVal).call(filterVal, columnValue) < 0) {
            isFiltered = true;
          } else if (filterType !== 'textField' && _Array$isArray(columnValue)) {
            if (options.filterArrayFullMatch) {
              //true if every filterVal exists in columnVal, false otherwise
              var isFullMatch = _everyInstanceProperty(filterVal).call(filterVal, function (el) {
                return _indexOfInstanceProperty(columnValue).call(columnValue, el) >= 0;
              });
              //if it is not a fullMatch, filter row out
              if (!isFullMatch) {
                isFiltered = true;
              }
            } else {
              var isAnyMatch = _someInstanceProperty(filterVal).call(filterVal, function (el) {
                return _indexOfInstanceProperty(columnValue).call(columnValue, el) >= 0;
              });
              //if no value matches, filter row out
              if (!isAnyMatch) {
                isFiltered = true;
              }
            }
          }
        }
        if (searchText && column.display !== 'excluded' && _this5.hasSearchText(columnVal, searchText, caseSensitive) && column.display !== 'false' && column.searchable) {
          isSearchFound = true;
        }
      };
      for (var index = 0; index < row.length; index++) {
        _loop();
      }
      var customSearch = props.options.customSearch;
      if (searchText && customSearch) {
        var customSearchResult = customSearch(searchText, row, columns);
        if (typeof customSearchResult !== 'boolean') {
          console.error('customSearch must return a boolean');
        } else {
          isSearchFound = customSearchResult;
        }
      }
      if (options.serverSide) {
        if (customSearch) {
          console.warn('Server-side filtering is enabled, hence custom search will be ignored.');
        }
        return displayRow;
      }
      if (isFiltered || searchText && !isSearchFound) return null;else return displayRow;
    }
  }, {
    key: "getDisplayData",
    value: function getDisplayData(columns, data, filterList, searchText, tableMeta, props) {
      var newRows = [];
      var dataForTableMeta = tableMeta ? tableMeta.tableData : props.data;
      for (var index = 0; index < data.length; index++) {
        var value = data[index].data;
        var displayRow = this.computeDisplayRow(columns, value, index, filterList, searchText, dataForTableMeta, this.options, props, data);
        if (displayRow) {
          newRows.push({
            data: displayRow,
            dataIndex: data[index].index
          });
        }
      }
      return newRows;
    }
  }, {
    key: "getSortDirectionLabel",
    value: function getSortDirectionLabel(sortOrder) {
      switch (sortOrder.direction) {
        case 'asc':
          return 'ascending';
        case 'desc':
          return 'descending';
        case 'none':
          return 'none';
        default:
          return '';
      }
    }
  }, {
    key: "getTableProps",
    value: function getTableProps() {
      var classes = this.props.classes;
      var tableProps = this.options.setTableProps() || {};
      tableProps.className = clsx(classes.tableRoot, tableProps.className);
      return tableProps;
    }
  }, {
    key: "sortTable",
    value: function sortTable(data, col, order) {
      var _this6 = this;
      var columnSortCompare = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var hasCustomTableSort = this.options.customSort && !columnSortCompare;
      var meta = {
        selectedRows: this.state.selectedRows
      }; // meta for customSort
      var dataSrc = hasCustomTableSort ? this.options.customSort(data, col, order || (this.options.sortDescFirst ? 'desc' : 'asc'), meta) : data;

      // reset the order by index
      var noSortData;
      if (order === 'none') {
        noSortData = _reduceInstanceProperty(data).call(data, function (r, i) {
          r[i.index] = i;
          return r;
        }, []);
      }
      var sortedData = _mapInstanceProperty(dataSrc).call(dataSrc, function (row, sIndex) {
        return {
          data: row.data[col],
          rowData: row.data,
          position: sIndex,
          rowSelected: _this6.state.selectedRows.lookup[row.index] ? true : false
        };
      });
      if (!hasCustomTableSort) {
        var sortFn = columnSortCompare || sortCompare;
        _sortInstanceProperty(sortedData).call(sortedData, sortFn(order));
      }
      var tableData = [];
      var selectedRows = [];
      for (var i = 0; i < sortedData.length; i++) {
        var row = sortedData[i];
        tableData.push(dataSrc[row.position]);
        if (row.rowSelected) {
          selectedRows.push({
            index: i,
            dataIndex: dataSrc[row.position].index
          });
        }
      }
      return {
        data: order === 'none' ? noSortData : tableData,
        selectedRows: {
          lookup: buildMap(selectedRows),
          data: selectedRows
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this,
        _context32,
        _context33,
        _context34,
        _context35;
      var _this$props = this.props,
        classes = _this$props.classes,
        className = _this$props.className,
        title = _this$props.title,
        _this$props$component = _this$props.components,
        TableBody = _this$props$component.TableBody,
        TableFilterList$1 = _this$props$component.TableFilterList,
        TableFooter$1 = _this$props$component.TableFooter,
        TableHead$1 = _this$props$component.TableHead,
        TableResize = _this$props$component.TableResize,
        TableToolbar = _this$props$component.TableToolbar,
        TableToolbarSelect = _this$props$component.TableToolbarSelect,
        _this$props$component2 = _this$props$component.DragDropBackend,
        DragDropBackend = _this$props$component2 === void 0 ? reactDndHtml5Backend.HTML5Backend : _this$props$component2;
      var _this$state2 = this.state,
        announceText = _this$state2.announceText,
        activeColumn = _this$state2.activeColumn,
        data = _this$state2.data,
        displayData = _this$state2.displayData,
        columns = _this$state2.columns,
        page = _this$state2.page,
        filterData = _this$state2.filterData,
        filterList = _this$state2.filterList,
        selectedRows = _this$state2.selectedRows,
        previousSelectedRow = _this$state2.previousSelectedRow,
        expandedRows = _this$state2.expandedRows,
        searchText = _this$state2.searchText,
        sortOrder = _this$state2.sortOrder;
        _this$state2.serverSideFilterList;
        var columnOrder = _this$state2.columnOrder;
      var TableBodyComponent = TableBody || DefaultTableBody;
      var TableFilterListComponent = TableFilterList$1 || TableFilterList;
      var TableFooterComponent = TableFooter$1 || TableFooter;
      var TableHeadComponent = TableHead$1 || TableHead;
      var TableResizeComponent = TableResize || DefaultTableResize;
      var TableToolbarComponent = TableToolbar || DefaultTableToolbar;
      var TableToolbarSelectComponent = TableToolbarSelect || DefaultTableToolbarSelect;
      var rowCount = this.state.count || displayData.length;
      var rowsPerPage = this.options.pagination ? this.state.rowsPerPage : displayData.length;
      var showToolbar = hasToolbarItem(this.options, title);
      var columnNames = _mapInstanceProperty(columns).call(columns, function (column) {
        return {
          name: column.name,
          filterType: column.filterType || _this7.options.filterType
        };
      });
      var responsiveOption = this.options.responsive;
      var paperClasses = _concatInstanceProperty(_context32 = "".concat(classes.paper, " ")).call(_context32, className);
      var maxHeight = this.options.tableBodyMaxHeight;
      var responsiveClass;
      switch (responsiveOption) {
        // deprecated
        case 'scroll':
          responsiveClass = classes.responsiveScroll;
          maxHeight = '499px';
          break;
        // deprecated
        case 'scrollMaxHeight':
          responsiveClass = classes.responsiveScrollMaxHeight;
          maxHeight = '499px';
          break;
        // deprecated
        case 'scrollFullHeight':
          responsiveClass = classes.responsiveScrollFullHeight;
          maxHeight = 'none';
          break;
        // deprecated
        case 'scrollFullHeightFullWidth':
          responsiveClass = classes.responsiveScrollFullHeight;
          paperClasses = _concatInstanceProperty(_context33 = "".concat(classes.paperResponsiveScrollFullHeightFullWidth, " ")).call(_context33, className);
          break;
        // deprecated
        case 'stacked':
          responsiveClass = classes.responsiveStacked;
          maxHeight = 'none';
          break;
        // deprecated
        case 'stackedFullWidth':
          responsiveClass = classes.responsiveStackedFullWidth;
          paperClasses = _concatInstanceProperty(_context34 = "".concat(classes.paperResponsiveScrollFullHeightFullWidth, " ")).call(_context34, className);
          maxHeight = 'none';
          break;
        default:
          responsiveClass = classes.responsiveBase;
          break;
      }
      var tableHeightVal = {};
      if (maxHeight) {
        tableHeightVal.maxHeight = maxHeight;
      }
      if (this.options.tableBodyHeight) {
        tableHeightVal.height = this.options.tableBodyHeight;
      }
      var tableProps = this.options.setTableProps ? this.options.setTableProps() || {} : {};
      var tableClassNames = clsx(classes.tableRoot, tableProps.className);
      delete tableProps.className; // remove className from props to avoid the className being applied twice

      var dndProps = {};
      if (typeof window !== 'undefined') {
        dndProps.context = window;
      }
      return /*#__PURE__*/React.createElement(Paper, {
        elevation: this.options.elevation,
        ref: this.tableContent,
        className: paperClasses
      }, (this.options.selectToolbarPlacement === STP.ALWAYS || selectedRows.data.length > 0 && this.options.selectToolbarPlacement !== STP.NONE) && /*#__PURE__*/React.createElement(TableToolbarSelectComponent, {
        options: this.options,
        selectedRows: selectedRows,
        onRowsDelete: this.selectRowDelete,
        displayData: displayData,
        selectRowUpdate: this.selectRowUpdate,
        components: this.props.components
      }), (selectedRows.data.length === 0 || _indexOfInstanceProperty(_context35 = [STP.ABOVE, STP.NONE]).call(_context35, this.options.selectToolbarPlacement) !== -1) && showToolbar && /*#__PURE__*/React.createElement(TableToolbarComponent, {
        columns: columns,
        columnOrder: columnOrder,
        displayData: displayData,
        data: data,
        filterData: filterData,
        filterList: filterList,
        filterUpdate: this.filterUpdate,
        updateFilterByType: this.updateFilterByType,
        options: this.options,
        resetFilters: this.resetFilters,
        searchText: searchText,
        searchTextUpdate: this.searchTextUpdate,
        searchClose: this.searchClose,
        tableRef: this.getTableContentRef,
        title: title,
        toggleViewColumn: this.toggleViewColumn,
        updateColumns: this.updateColumns,
        setTableAction: this.setTableAction,
        components: this.props.components
      }), /*#__PURE__*/React.createElement(TableFilterListComponent, {
        options: this.options,
        serverSideFilterList: this.props.options.serverSideFilterList,
        filterListRenderers: _mapInstanceProperty(columns).call(columns, function (c) {
          if (c.customFilterListOptions && c.customFilterListOptions.render) return c.customFilterListOptions.render;
          // DEPRECATED: This option is being replaced with customFilterListOptions.render
          if (c.customFilterListRender) return c.customFilterListRender;
          return function (f) {
            return f;
          };
        }),
        customFilterListUpdate: _mapInstanceProperty(columns).call(columns, function (c) {
          return c.customFilterListOptions && c.customFilterListOptions.update ? c.customFilterListOptions.update : null;
        }),
        filterList: filterList,
        filterUpdate: this.filterUpdate,
        columnNames: columnNames
      }), /*#__PURE__*/React.createElement("div", {
        style: _objectSpread({
          position: 'relative'
        }, tableHeightVal),
        className: responsiveClass
      }, (this.options.resizableColumns === true || this.options.resizableColumns && this.options.resizableColumns.enabled) && /*#__PURE__*/React.createElement(TableResizeComponent, {
        key: rowCount,
        columnOrder: columnOrder,
        updateDividers: function updateDividers(fn) {
          return _this7.updateDividers = fn;
        },
        setResizeable: function setResizeable(fn) {
          return _this7.setHeadResizeable = fn;
        },
        options: this.props.options,
        tableId: this.options.tableId
      }), function () {
        var components = /*#__PURE__*/React.createElement(MuiTable, _extends({
          ref: function ref(el) {
            return _this7.tableRef = el;
          },
          tabIndex: '0',
          role: 'grid',
          className: tableClassNames
        }, tableProps), /*#__PURE__*/React.createElement("caption", {
          className: classes.caption
        }, title), /*#__PURE__*/React.createElement(TableHeadComponent, {
          columns: columns,
          activeColumn: activeColumn,
          data: displayData,
          count: rowCount,
          page: page,
          rowsPerPage: rowsPerPage,
          selectedRows: selectedRows,
          selectRowUpdate: _this7.selectRowUpdate,
          toggleSort: _this7.toggleSortColumn,
          setCellRef: _this7.setHeadCellRef,
          expandedRows: expandedRows,
          areAllRowsExpanded: _this7.areAllRowsExpanded,
          toggleAllExpandableRows: _this7.toggleAllExpandableRows,
          options: _this7.options,
          sortOrder: sortOrder,
          columnOrder: columnOrder,
          updateColumnOrder: _this7.updateColumnOrder,
          draggableHeadCellRefs: _this7.draggableHeadCellRefs,
          tableRef: _this7.getTableContentRef,
          tableId: _this7.options.tableId,
          timers: _this7.timers,
          components: _this7.props.components
        }), /*#__PURE__*/React.createElement(TableBodyComponent, {
          data: displayData,
          count: rowCount,
          columns: columns,
          page: page,
          rowsPerPage: rowsPerPage,
          selectedRows: selectedRows,
          selectRowUpdate: _this7.selectRowUpdate,
          previousSelectedRow: previousSelectedRow,
          expandedRows: expandedRows,
          toggleExpandRow: _this7.toggleExpandRow,
          options: _this7.options,
          columnOrder: columnOrder,
          filterList: filterList,
          components: _this7.props.components,
          tableId: _this7.options.tableId
        }), _this7.options.customTableBodyFooterRender ? _this7.options.customTableBodyFooterRender({
          data: displayData,
          count: rowCount,
          columns: columns,
          selectedRows: selectedRows,
          selectableRows: _this7.options.selectableRows
        }) : null);
        if (DragDropBackend) {
          return /*#__PURE__*/React.createElement(reactDnd.DndProvider, _extends({
            backend: DragDropBackend
          }, dndProps), components);
        }
        return components;
      }()), /*#__PURE__*/React.createElement(TableFooterComponent, {
        options: this.options,
        page: page,
        rowCount: rowCount,
        rowsPerPage: rowsPerPage,
        changeRowsPerPage: this.changeRowsPerPage,
        changePage: this.changePage
      }), /*#__PURE__*/React.createElement("div", {
        className: classes.liveAnnounce,
        "aria-live": 'polite'
      }, announceText));
    }
  }]);
}(React.Component);
_defineProperty(MUIDataTable, "propTypes", {
  /** Title of the table */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  /** Data used to describe table */
  data: PropTypes.array.isRequired,
  /** Columns used to describe table */
  columns: PropTypes.PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.shape({
      display: PropTypes.oneOf(['true', 'false', 'excluded', 'always', true, false]),
      empty: PropTypes.bool,
      filter: PropTypes.bool,
      sort: PropTypes.bool,
      print: PropTypes.bool,
      searchable: PropTypes.bool,
      download: PropTypes.bool,
      viewColumns: PropTypes.bool,
      filterList: PropTypes.array,
      filterOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({
        names: PropTypes.array,
        logic: PropTypes.func,
        display: PropTypes.func
      })]),
      filterType: PropTypes.oneOf(['dropdown', 'checkbox', 'multiselect', 'textField', 'custom']),
      customHeadRender: PropTypes.func,
      customBodyRender: PropTypes.func,
      customBodyRenderLite: PropTypes.func,
      customHeadLabelRender: PropTypes.func,
      customFilterListOptions: PropTypes.oneOfType([PropTypes.shape({
        render: PropTypes.func,
        update: PropTypes.func
      })]),
      customFilterListRender: PropTypes.func,
      setCellProps: PropTypes.func,
      setCellHeaderProps: PropTypes.func,
      sortThirdClickReset: PropTypes.bool,
      sortDescFirst: PropTypes.bool
    })
  })])).isRequired,
  /** Options used to describe table */
  options: PropTypes.shape({
    caseSensitive: PropTypes.bool,
    columnOrder: PropTypes.array,
    count: PropTypes.number,
    confirmFilters: PropTypes.bool,
    consoleWarnings: PropTypes.bool,
    customFilterDialogFooter: PropTypes.func,
    customFooter: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    customRowRender: PropTypes.func,
    customSearch: PropTypes.func,
    customSearchRender: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    customSort: PropTypes.func,
    customToolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    customToolbarSelect: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    draggableColumns: PropTypes.object,
    enableNestedDataAccess: PropTypes.string,
    expandableRows: PropTypes.bool,
    expandableRowsHeader: PropTypes.bool,
    expandableRowsOnClick: PropTypes.bool,
    disableToolbarSelect: PropTypes.bool,
    download: PropTypes.oneOf([true, false, 'true', 'false', 'disabled']),
    downloadOptions: PropTypes.shape({
      filename: PropTypes.string,
      separator: PropTypes.string,
      filterOptions: PropTypes.shape({
        useDisplayedColumnsOnly: PropTypes.bool,
        useDisplayedRowsOnly: PropTypes.bool
      })
    }),
    filter: PropTypes.oneOf([true, false, 'true', 'false', 'disabled']),
    filterArrayFullMatch: PropTypes.bool,
    filterType: PropTypes.oneOf(['dropdown', 'checkbox', 'multiselect', 'textField', 'custom']),
    fixedHeader: PropTypes.bool,
    fixedSelectColumn: PropTypes.bool,
    getTextLabels: PropTypes.func,
    isRowExpandable: PropTypes.func,
    isRowSelectable: PropTypes.func,
    jumpToPage: PropTypes.bool,
    onDownload: PropTypes.func,
    onFilterChange: PropTypes.func,
    onFilterChipClose: PropTypes.func,
    onFilterConfirm: PropTypes.func,
    onFilterDialogOpen: PropTypes.func,
    onFilterDialogClose: PropTypes.func,
    onRowClick: PropTypes.func,
    onRowsExpand: PropTypes.func,
    onRowExpansionChange: PropTypes.func,
    onRowsSelect: PropTypes.func,
    onRowSelectionChange: PropTypes.func,
    onTableChange: PropTypes.func,
    onTableInit: PropTypes.func,
    page: PropTypes.number,
    pagination: PropTypes.bool,
    print: PropTypes.oneOf([true, false, 'true', 'false', 'disabled']),
    searchProps: PropTypes.object,
    selectableRows: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['none', 'single', 'multiple'])]),
    selectableRowsHeader: PropTypes.bool,
    selectableRowsHideCheckboxes: PropTypes.bool,
    selectableRowsOnClick: PropTypes.bool,
    serverSide: PropTypes.bool,
    tableId: PropTypes.string,
    tableBodyHeight: PropTypes.string,
    tableBodyMaxHeight: PropTypes.string,
    renderExpandableRow: PropTypes.func,
    resizableColumns: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    responsive: PropTypes.oneOf(['standard', 'vertical', 'verticalAlways', 'simple']),
    rowHover: PropTypes.bool,
    rowsExpanded: PropTypes.array,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
    rowsSelected: PropTypes.array,
    search: PropTypes.oneOf([true, false, 'true', 'false', 'disabled']),
    searchOpen: PropTypes.bool,
    searchAlwaysOpen: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    searchText: PropTypes.string,
    setFilterChipProps: PropTypes.func,
    setRowProps: PropTypes.func,
    selectToolbarPlacement: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([STP.REPLACE, STP.ABOVE, STP.NONE, STP.ALWAYS])]),
    setTableProps: PropTypes.func,
    sort: PropTypes.bool,
    sortOrder: PropTypes.object,
    storageKey: PropTypes.string,
    viewColumns: PropTypes.oneOf([true, false, 'true', 'false', 'disabled'])
  }),
  /** Pass and use className to style MUIDataTable as desired */
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.any)
});
_defineProperty(MUIDataTable, "defaultProps", {
  title: '',
  options: {},
  data: [],
  columns: [],
  components: {
    TableBody: DefaultTableBody,
    TableFilter: DefaultTableFilter,
    TableFilterList: TableFilterList,
    TableFooter: TableFooter,
    TableHead: TableHead,
    TableResize: DefaultTableResize,
    TableToolbar: DefaultTableToolbar,
    TableToolbarSelect: DefaultTableToolbarSelect,
    Tooltip: MuiTooltip,
    icons: {}
  }
});
var MUIDataTable$1 = mui.withStyles(MUIDataTable, defaultTableStyles, {
  name: 'MUIDataTable'
});

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? _Reflect$construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function later() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = _setTimeout(later, wait);
  };
}
var defaultStyles = function defaultStyles(theme) {
  return {
    main: {
      display: 'flex',
      flex: '1 0 auto',
      alignItems: 'center'
    },
    searchIcon: {
      color: theme.palette.text.secondary,
      marginRight: '8px'
    },
    searchText: {
      flex: '0.8 0'
    },
    clearIcon: {
      '&:hover': {
        color: theme.palette.error.main
      }
    }
  };
};
var _DebounceTableSearch = /*#__PURE__*/function (_React$Component) {
  function _DebounceTableSearch() {
    var _context;
    var _this;
    _classCallCheck(this, _DebounceTableSearch);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, _DebounceTableSearch, _concatInstanceProperty(_context = []).call(_context, args));
    _defineProperty(_this, "handleTextChangeWrapper", function (debouncedSearch) {
      return function (event) {
        debouncedSearch(event.target.value);
      };
    });
    _defineProperty(_this, "onKeyDown", function (event) {
      if (event.keyCode === 27) {
        _this.props.onHide();
      }
    });
    return _this;
  }
  _inherits(_DebounceTableSearch, _React$Component);
  return _createClass(_DebounceTableSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        options = _this$props.options,
        onHide = _this$props.onHide,
        searchText = _this$props.searchText,
        debounceWait = _this$props.debounceWait;
      var debouncedSearch = debounce(function (value) {
        _this2.props.onSearch(value);
      }, debounceWait);
      var clearIconVisibility = options.searchAlwaysOpen ? 'hidden' : 'visible';
      return /*#__PURE__*/React.createElement(Grow, {
        appear: true,
        in: true,
        timeout: 300
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.main
      }, /*#__PURE__*/React.createElement(SearchIcon, {
        className: classes.searchIcon
      }), /*#__PURE__*/React.createElement(TextField, _extends({
        variant: 'standard',
        className: classes.searchText,
        autoFocus: true,
        InputProps: {
          'data-test-id': options.textLabels.toolbar.search,
          'aria-label': options.textLabels.toolbar.search
        },
        defaultValue: searchText,
        onChange: this.handleTextChangeWrapper(debouncedSearch),
        fullWidth: true,
        inputRef: function inputRef(el) {
          return _this2.searchField = el;
        },
        placeholder: options.searchPlaceholder
      }, options.searchProps ? options.searchProps : {})), /*#__PURE__*/React.createElement(IconButton, {
        className: classes.clearIcon,
        style: {
          visibility: clearIconVisibility
        },
        onClick: onHide
      }, /*#__PURE__*/React.createElement(ClearIcon, null))));
    }
  }]);
}(React.Component);
var DebounceTableSearch = mui.withStyles(_DebounceTableSearch, defaultStyles, {
  name: 'MUIDataTableSearch'
});
function debounceSearchRender() {
  var debounceWait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
  return function (searchText, handleSearch, hideSearch, options) {
    return /*#__PURE__*/React.createElement(DebounceTableSearch, {
      searchText: searchText,
      onSearch: handleSearch,
      onHide: hideSearch,
      options: options,
      debounceWait: debounceWait
    });
  };
}

exports.DebounceTableSearch = DebounceTableSearch;
exports.ExpandButton = ExpandButton;
exports.Popover = Popover;
exports.TableBody = DefaultTableBody;
exports.TableBodyCell = TableBodyCell;
exports.TableBodyRow = TableBodyRow$1;
exports.TableFilter = DefaultTableFilter;
exports.TableFilterList = TableFilterList;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeadCell = TableHeadCell;
exports.TableHeadRow = TableHeadRow;
exports.TablePagination = TablePagination;
exports.TableResize = DefaultTableResize;
exports.TableSearch = TableSearch;
exports.TableSelectCell = TableSelectCell;
exports.TableToolbar = DefaultTableToolbar;
exports.TableToolbarSelect = DefaultTableToolbarSelect;
exports.TableViewCol = TableViewCol;
exports.debounceSearchRender = debounceSearchRender;
exports.default = MUIDataTable$1;
//# sourceMappingURL=index.js.map
