// iCal (.ics) file generator
// Creates a calendar event for Energieffektiv Fremtid 2026

function formatDateToICS(date) {
  // Format: YYYYMMDDTHHmmssZ (UTC)
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function generateICalFile() {
  // Event details
  const event = {
    title: 'Energieffektiv Fremtid 2026',
    description: 'Hold av datoen - Energieffektiv Fremtid konferansen samler forskere, kunnskapsinstittusjoner, industri og politikere til diskusjon om å energieffektivisere Norge.',
    location: 'Norge (nøyaktig sted bekreftes senere)',
    // May 21, 2026 - full day event
    start: new Date(Date.UTC(2026, 4, 21, 8, 0, 0)), // 8:00 AM UTC (10:00 AM CEST)
    end: new Date(Date.UTC(2026, 4, 21, 16, 0, 0)), // 4:00 PM UTC (6:00 PM CEST)
  };

  const now = new Date();
  const uid = `eef-2026-${now.getTime()}@energieffektivfremtid.no`;

  // Create iCal content (RFC 5545 format)
  const icalContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Energieffektiv Fremtid//NONSGML v1.0//NO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Energieffektiv Fremtid 2026',
    'X-WR-TIMEZONE:Europe/Oslo',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatDateToICS(now)}`,
    `DTSTART:${formatDateToICS(event.start)}`,
    `DTEND:${formatDateToICS(event.end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Create Blob and trigger download
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'energieffektiv-fremtid-2026.ics';

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('✅ iCal file generated and download triggered');
}

// Attach event listener to download button
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-ical');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', generateICalFile);
    } else {
      console.warn('Download button not found');
    }
  });
} else {
  const downloadBtn = document.getElementById('download-ical');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', generateICalFile);
  }
}
