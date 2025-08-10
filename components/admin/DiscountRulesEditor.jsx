import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

const DiscountRulesEditor = ({ rules, onRulesChange }) => {
  const [newRule, setNewRule] = useState({ type: 'flat', value: '' });

  const addRule = () => {
    if (!newRule.value) return;
    onRulesChange([...rules, { ...newRule, value: Number(newRule.value) }]);
    setNewRule({ type: 'flat', value: '' });
  };

  const removeRule = (index) => {
    onRulesChange(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Discount Rules</h4>
      {rules.map((rule, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <span>{rule.type === 'flat' ? `₹${rule.value} off` : `${rule.value}% off`}</span>
          <button type="button" onClick={() => removeRule(index)} className="text-red-500">
            <FaIcons.FaTrash />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <select
          value={newRule.type}
          onChange={(e) => setNewRule({ ...newRule, type: e.target.value })}
          className="input"
        >
          <option value="flat">Flat</option>
          <option value="percent">Percent</option>
        </select>
        <input
          type="number"
          value={newRule.value}
          onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
          placeholder="Value"
          className="input"
        />
        <button type="button" onClick={addRule} className="btn-secondary p-2">
          <FaIcons.FaPlus />
        </button>
      </div>
    </div>
  );
};

export default DiscountRulesEditor;
