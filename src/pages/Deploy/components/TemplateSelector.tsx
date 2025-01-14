import React, { useState, useEffect } from 'react';
import { ContractTemplate } from '../types';
import { fetchContractTemplates } from '../../../services/contractService';
import { FileCode, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface TemplateSelectorProps {
  onSelect: (template: ContractTemplate) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await fetchContractTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Failed to load contract templates');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex space-x-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedCategory === category
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="relative group bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <FileCode className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">v{template.version}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 line-clamp-2">
              {template.description}
            </p>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {template.parameters.slice(0, 3).map(param => (
                  <span
                    key={param.name}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {param.name}
                  </span>
                ))}
                {template.parameters.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{template.parameters.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-900 capitalize">
                  {template.category}
                </span>
                <span className="text-indigo-600 font-medium group-hover:text-indigo-500">
                  Select Template →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No templates found for the selected category.
        </div>
      )}
    </div>
  );
}