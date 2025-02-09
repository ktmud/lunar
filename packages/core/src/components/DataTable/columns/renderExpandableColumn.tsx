import React from 'react';
import { Column } from 'react-virtualized';
import ExpandableIcon from '../../ExpandableIcon';
import { WithStylesProps } from '../../../composers/withStyles';
import { EXPANDABLE_COLUMN_WIDTH } from '../constants';
import { VirtualRow } from '../types';

export default function renderExpandableColumn(
  cx: WithStylesProps['cx'],
  styles: WithStylesProps['styles'],
  expandedRows: Set<number>,
  expandRow: (newExpandedRowIndex: number) => (event: React.SyntheticEvent) => void,
) {
  const cellRenderer = (row: VirtualRow) => {
    const { children, originalIndex } = row.rowData.metadata;

    if (children && children.length > 0) {
      return (
        <div
          className={cx(styles.expandCaret)}
          role="button"
          tabIndex={0}
          onClick={expandRow(originalIndex)}
          onKeyPress={expandRow(originalIndex)}
        >
          <ExpandableIcon expanded={expandedRows.has(originalIndex)} />
        </div>
      );
    }

    return <div className={cx(styles.row)} />;
  };

  return <Column dataKey="expanded" cellRenderer={cellRenderer} width={EXPANDABLE_COLUMN_WIDTH} />;
}
