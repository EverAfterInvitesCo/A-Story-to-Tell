import { WeddingConfig } from '../types';

export function generateGoogleCalendarUrl(config: WeddingConfig): string {
  // Start: 2026-09-13 19:00 (Cairo time UTC+2 or local) -> End: 2026-09-14 02:00
  const title = encodeURIComponent(`${config.partnerOne.firstName} & ${config.partnerTwo.firstName}'s Wedding Celebration`);
  const details = encodeURIComponent(
    `${config.invitationMessage.formalText}\n\nSchedule:\n${config.schedule.map(s => `${s.time} - ${s.title}`).join('\n')}\n\nDress Code: ${config.details.dressCode.title}\nContact: ${config.rsvp.contactEmail}`
  );
  const location = encodeURIComponent(`${config.venue.name}, ${config.venue.address}`);
  
  // Format YYYYMMDDTHHmmSSZ
  const startTime = "20260913T170000Z";
  const endTime = "20260913T235900Z";
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
}

export function downloadIcsFile(config: WeddingConfig) {
  const title = `${config.partnerOne.firstName} & ${config.partnerTwo.firstName}'s Wedding`;
  const description = `${config.invitationMessage.formalText}\\n\\nVenue: ${config.venue.name}\\nAddress: ${config.venue.address}`;
  const location = `${config.venue.name}, ${config.venue.address}`;
  const startTime = "20260913T170000Z";
  const endTime = "20260913T235900Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EverAfterInvites//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    "STATUS:CONFIRMED",
    `ORGANIZER;CN=EverAfterInvites:MAILTO:${config.rsvp.contactEmail}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${config.partnerOne.firstName}_and_${config.partnerTwo.firstName}_Wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
