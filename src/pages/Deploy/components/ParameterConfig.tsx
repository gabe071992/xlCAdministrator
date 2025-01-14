import React, { useState } from 'react';
import { ContractTemplate, ContractParameter } from '../types';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ParameterConfigProps {
  template: ContractTemplate;
  onDeploy: (parameters: Record<string, any>) => void;
}

export default function ParameterConfig({ template, onDeploy }: ParameterConfigProps) {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateParameter = (param: ContractParameter, value: any): string | null => {
    if (param.required && !value) {
      return 'This field is required';
    }

    if (param.validation) {
      const { min, max, pattern } = param.validation;

      if (typeof value === 'number') {
        if (min !== undefined && value < min) {
          return `Value must be at least ${min}`;
        }
        if (max !== undefined && value > max) {
          return `Value must be at most ${max}`;
        }
      }

      if (pattern && typeof value === 'string' && !new RegExp(pattern).test(value)) {
        return 'Invalid format';
      }
    }

    return null;
  };

  const handleChange = (param: ContractParameter, value: any) => {
    const newParameters = { ...parameters };
    const newErrors = { ...errors };

    // Convert value based on parameter type
    let parsedValue = value;
    if (param.type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (param.type === 'boolean') {
      parsedValue = value === 'true';
    }

    newParameters[param.name] = parsedValue;
    
    const error = validateParameter(param, parsedValue);
    if (error) {
      newErrors[param.name] = error;
    } else {
      delete newErrors[param.name];
    }

    setParameters(newParameters);
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all parameters
    const newErrors: Record<string, string> = {};
    template.parameters.forEach(param => {
      const error = validateParameter(param, parameters[param.name]);
      if (error) {
        newErrors[param.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors before deploying');
      return;
    }

    onDeploy(parameters);
  };

  const renderInput = (param: ContractParameter) => {
    switch (param.type) {
      case 'boolean':
        return (
          <select
            value={parameters[param.name]?.toString() || 'false'}
            onChange={(e) => handleChange(param, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={parameters[param.name] || ''}
            onChange={(e) => handleChange(param, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min={param.validation?.min}
            max={param.validation?.max}
          />
        );

      case 'address':
        return (
          <input
            type="text"
            value={parameters[param.name] || ''}
            onChange={(e) => handleChange(param, e.target.value)}
            className="mt-1 block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="0x..."
            pattern="^0x[a-fA-F0-9]{40}$"
          />
        );

      case 'array':
        return (
          <textarea
            value={parameters[param.name]?.join('\n') || ''}
            onChange={(e) => handleChange(param, e.target.value.split('\n'))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="One item per line"
            rows={3}
          />
        );

      default:
        return (
          <input
            type="text"
            value={parameters[param.name] || ''}
            onChange={(e) => handleChange(param, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {template.parameters.map(param => (
          <div key={param.name}>
            <label className="block text-sm font-medium text-gray-700">
              {param.name}
              {param.required && <span className="text-red-500">*</span>}
            </label>
            {renderInput(param)}
            {param.description && (
              <p className="mt-1 text-sm text-gray-500">{param.description}</p>
            )}
            {errors[param.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[param.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Deploy Contract
        </button>
      </div>
    </form>
  );
}