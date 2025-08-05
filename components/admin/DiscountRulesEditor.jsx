import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DiscountRulesEditor = ({ rules, onChange }) => {
    const [newRule, setNewRule] = useState({ type: 'flat', value: '', criteria: '' });

    const addRule = () => {
        onChange([...rules, newRule]);
        setNewRule({ type: 'flat', value: '', criteria: '' });
    };

    const removeRule = (index) => {
        const updatedRules = rules.filter((_, i) => i !== index);
        onChange(updatedRules);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Discount Rules</h3>
            {rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-4 p-2 border rounded-lg">
                    <span>{rule.type}: {rule.value} ({rule.criteria})</span>
                    <button type="button" onClick={() => removeRule(index)} className="text-red-500"><FaTrash /></button>
                </div>
            ))}

            <div className="flex items-center gap-2">
                <select value={newRule.type} onChange={e => setNewRule({ ...newRule, type: e.target.value })} className="p-2 border rounded-lg">
                    <option value="flat">Flat</option>
                    <option value="percent">Percent</option>
                    <option value="buyXgetY">Buy X Get Y</option>
                </select>
                <input type="text" value={newRule.value} onChange={e => setNewRule({ ...newRule, value: e.target.value })} placeholder="Value" className="p-2 border rounded-lg" />
                <input type="text" value={newRule.criteria} onChange={e => setNewRule({ ...newRule, criteria: e.target.value })} placeholder="Criteria" className="p-2 border rounded-lg" />
                <button type="button" onClick={addRule} className="p-2 bg-blue-500 text-white rounded-lg"><FaPlus /></button>
            </div>
        </div>
    );
};

export default DiscountRulesEditor;
