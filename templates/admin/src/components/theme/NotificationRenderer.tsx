import React from 'react';
import { Slide, toast, TypeOptions } from 'react-toastify';
import { NotificationOptions } from '../../lib/plume-notification/NotificationEngine';
import ObservableNotificationEngine
  from '../../lib/plume-notification/ObservableNotificationEngine';

export default class NotificationRenderer {
  constructor(private readonly notificationEngine: ObservableNotificationEngine) {
  }

  static notificationStyleToToastColor(options?: NotificationOptions): TypeOptions | undefined {
    if (!options) {
      return undefined;
    }
    if (options.style === 'danger') {
      return 'error';
    }
    return options.style;
  }

  initialize() {
    this.notificationEngine
      .currentNotification()
      .subscribe((notification) => {
        if (notification) {
          const notificationStyle = NotificationRenderer.notificationStyleToToastColor(notification.options);
          toast(
            <div className="toast-content">
              <span className="toast-message">{notification.message}</span>
            </div>,
            {
              type: notificationStyle,
              position: 'top-right',
              hideProgressBar: true,
              closeOnClick: true,
              transition: Slide,
            },
          );
        }
      });
  }
}
