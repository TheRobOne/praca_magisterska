import React from 'react';
import PropTypes from 'prop-types';

 const SelectList = ({
     itemList,
     onChange,
     value
 }) => {
  return (
    <div>
        <select className="form-control" onChange={onChange} value={value}>
            {itemList}
        </select>
    </div>
  )
}

SelectList.propTypes = {
    itemList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SelectList;