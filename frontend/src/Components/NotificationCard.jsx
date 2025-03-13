import React from 'react';
import { Check, AlertTriangle, Info, Bell, X } from 'lucide-react';

const NotificationCard = ({notification}) => {

  const getTypeDetails = (type) => {
    switch(type) {
      case "success":
        return {
          icon: <Check size={16} />,
          color: "bg-green-500",
          lightColor: "bg-green-100",
          textColor: "text-green-700"
        };
      case "warning":
        return {
          icon: <AlertTriangle size={16} />,
          color: "bg-yellow-500",
          lightColor: "bg-yellow-100",
          textColor: "text-yellow-700"
        };
      case "error":
        return {
          icon: <X size={16} />,
          color: "bg-red-500",
          lightColor: "bg-red-100",
          textColor: "text-red-700"
        };
      case "info":
        return {
          icon: <Info size={16} />,
          color: "bg-blue-500",
          lightColor: "bg-blue-100",
          textColor: "text-blue-700"
        };
      default:
        return {
          icon: <Bell size={16} />,
          color: "bg-gray-500",
          lightColor: "bg-gray-100",
          textColor: "text-gray-700"
        };
    }
  };
  
  const typeDetails = getTypeDetails(notification.type);
  
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white rounded-md shadow-sm border border-gray-100 flex items-center overflow-hidden">
        {/* Left border status indicator */}
        <div className={`h-full w-1 ${typeDetails.color}`}></div>
        
        {/* Icon container */}
        <div className={`p-2 m-2 rounded-full ${typeDetails.lightColor} ${typeDetails.textColor} flex-shrink-0`}>
          {typeDetails.icon}
        </div>
        
        {/* Text content */}
        <div className="flex-grow py-2 pr-2">
          <div className="flex justify-between items-baseline">
            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
            <span className="text-xs text-gray-400">{notification.time}</span>
          </div>
          <p className="text-xs text-gray-500">{notification.message}</p>
        </div>
        
        {/* Close button (optional) */}
        {notification.dismissible && (
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;