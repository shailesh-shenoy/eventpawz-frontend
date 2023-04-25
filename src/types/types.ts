export type AppUser = {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  role?: string;
  avatar?: null;
  enabled?: boolean;
  createdEvents?: Event[];
  attendedEvents?: Event[];
};

export type Event = {
  eventId?: number;
  eventName?: string;
  description?: string;
  coverImage?: string;
  eventDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  status?: string;
  virtualMeetLink?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  eventType?: EventType;
  createdBy?: Attendee;
  attendees?: Attendee[];
};

export type EventType = {
  eventTypeId?: number;
  type?: string;
};

export type AuthResponse = {
  username?: string;
  id?: string;
  accessToken?: string;
};

export type RegisterRequest = {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
};

export type Attendee = {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  role?: string;
  avatar?: null | string;
  enabled?: boolean;
};
