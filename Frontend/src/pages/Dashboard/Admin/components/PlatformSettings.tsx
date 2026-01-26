import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, DollarSign, Shield, Bell, Globe, Users, Save, RotateCcw, Check, X, AlertTriangle } from 'lucide-react';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  type: 'number' | 'boolean' | 'select' | 'text';
  value: any;
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  category: string;
}

export default function PlatformSettings() {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'commission_rate',
      title: 'Platform Commission',
      description: 'Percentage fee charged on completed projects',
      type: 'number',
      value: 10,
      min: 1,
      max: 30,
      unit: '%',
      category: 'financial'
    },
    {
      id: 'min_project_budget',
      title: 'Minimum Project Budget',
      description: 'Minimum amount allowed for new projects',
      type: 'number',
      value: 50,
      min: 1,
      max: 1000,
      unit: '$',
      category: 'financial'
    },
    {
      id: 'escrow_hold_days',
      title: 'Escrow Hold Period',
      description: 'Days to hold payment in escrow after completion',
      type: 'number',
      value: 7,
      min: 1,
      max: 30,
      unit: 'days',
      category: 'financial'
    },
    {
      id: 'auto_verification',
      title: 'Auto Verification',
      description: 'Automatically verify users with valid documents',
      type: 'boolean',
      value: false,
      category: 'security'
    },
    {
      id: 'require_2fa',
      title: 'Require 2FA',
      description: 'Force two-factor authentication for all users',
      type: 'boolean',
      value: true,
      category: 'security'
    },
    {
      id: 'max_login_attempts',
      title: 'Max Login Attempts',
      description: 'Maximum failed login attempts before lockout',
      type: 'number',
      value: 5,
      min: 3,
      max: 10,
      unit: 'attempts',
      category: 'security'
    },
    {
      id: 'email_notifications',
      title: 'Email Notifications',
      description: 'Send email notifications for platform events',
      type: 'boolean',
      value: true,
      category: 'notifications'
    },
    {
      id: 'notification_frequency',
      title: 'Notification Frequency',
      description: 'How often to send digest notifications',
      type: 'select',
      value: 'daily',
      options: ['immediate', 'hourly', 'daily', 'weekly'],
      category: 'notifications'
    },
    {
      id: 'platform_language',
      title: 'Default Language',
      description: 'Default language for new users',
      type: 'select',
      value: 'english',
      options: ['english', 'spanish', 'french', 'german', 'chinese'],
      category: 'general'
    },
    {
      id: 'maintenance_mode',
      title: 'Maintenance Mode',
      description: 'Enable maintenance mode for platform updates',
      type: 'boolean',
      value: false,
      category: 'general'
    }
  ]);

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Settings', icon: Settings },
    { id: 'financial', name: 'Financial', icon: DollarSign },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'general', name: 'General', icon: Globe }
  ];

  const updateSetting = (id: string, value: any) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    // In real implementation, this would call an API
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    // Reset to default values - in real implementation, this would fetch from API
    setHasChanges(false);
  };

  const filteredSettings = activeCategory === 'all' 
    ? settings 
    : settings.filter(setting => setting.category === activeCategory);

  const renderSettingInput = (setting: SettingItem) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateSetting(setting.id, !setting.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              setting.value ? 'bg-green-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                setting.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </motion.button>
        );
      
      case 'number':
        return (
          <div className="flex items-center gap-2">
            {setting.unit === '$' && <span className="text-slate-600">$</span>}
            <input
              type="number"
              value={setting.value}
              onChange={(e) => updateSetting(setting.id, parseInt(e.target.value))}
              min={setting.min}
              max={setting.max}
              className="w-24 px-3 py-2 bg-white/80 border border-slate-300 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {setting.unit && setting.unit !== '$' && (
              <span className="text-slate-600">{setting.unit}</span>
            )}
          </div>
        );
      
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="px-4 py-2 bg-white/80 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 capitalize"
          >
            {setting.options?.map(option => (
              <option key={option} value={option} className="capitalize">
                {option.replace('_', ' ')}
              </option>
            ))}
          </select>
        );
      
      case 'text':
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="px-4 py-2 bg-white/80 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );
      
      default:
        return null;
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const Icon = category?.icon || Settings;
    return Icon;
  };

  const getCategoryColor = (categoryId: string) => {
    const colors = {
      financial: 'from-green-100 to-emerald-100 border-green-200 text-green-700',
      security: 'from-red-100 to-rose-100 border-red-200 text-red-700',
      notifications: 'from-blue-100 to-indigo-100 border-blue-200 text-blue-700',
      general: 'from-purple-100 to-violet-100 border-purple-200 text-purple-700'
    };
    return colors[categoryId as keyof typeof colors] || 'from-slate-100 to-gray-100 border-slate-200 text-slate-700';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <Settings className="text-white" size={20} />
              </div>
              Platform Settings
              {hasChanges && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold flex items-center gap-1">
                  <AlertTriangle size={14} />
                  Unsaved Changes
                </span>
              )}
            </h2>
            <p className="text-slate-600">Configure platform settings and preferences</p>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              disabled={!hasChanges}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw size={16} />
              Reset
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <Save size={16} />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} />
                {category.name}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="p-6">
        <div className="space-y-6">
          {Object.entries(
            filteredSettings.reduce((acc, setting) => {
              if (!acc[setting.category]) acc[setting.category] = [];
              acc[setting.category].push(setting);
              return acc;
            }, {} as Record<string, SettingItem[]>)
          ).map(([categoryId, categorySettings]) => {
            const Icon = getCategoryIcon(categoryId);
            const colorClass = getCategoryColor(categoryId);
            
            return (
              <motion.div
                key={categoryId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${colorClass} border rounded-2xl p-6`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/80 rounded-xl">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold capitalize">
                    {categoryId.replace('_', ' ')} Settings
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {categorySettings.map(setting => (
                    <motion.div
                      key={setting.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 mb-1">
                          {setting.title}
                        </div>
                        <div className="text-sm text-slate-600">
                          {setting.description}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {renderSettingInput(setting)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="p-6 border-t border-slate-200/50 bg-slate-50/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Settings className="text-white" size={16} />
              </div>
              <div className="text-sm text-blue-700 font-medium">Total Settings</div>
            </div>
            <div className="text-2xl font-bold text-blue-800">{settings.length}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-xl">
                <Check className="text-white" size={16} />
              </div>
              <div className="text-sm text-green-700 font-medium">Active</div>
            </div>
            <div className="text-2xl font-bold text-green-800">
              {settings.filter(s => s.type === 'boolean' && s.value).length}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-600 rounded-xl">
                <AlertTriangle className="text-white" size={16} />
              </div>
              <div className="text-sm text-orange-700 font-medium">Modified</div>
            </div>
            <div className="text-2xl font-bold text-orange-800">
              {hasChanges ? '1' : '0'}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-xl">
                <Users className="text-white" size={16} />
              </div>
              <div className="text-sm text-purple-700 font-medium">Categories</div>
            </div>
            <div className="text-2xl font-bold text-purple-800">
              {categories.length - 1}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
