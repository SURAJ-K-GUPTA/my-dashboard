// utils/exportToCSV.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
export const exportToCSV = (data: any[], fileName: string) => {
    const csvContent = [
      ["ID", "Name", "Value", "Category", "Created At"], // Headers
      ...data.map(metric => [
        metric.id,
        metric.name,
        metric.value,
        metric.category || '',
        metric.created_at || ''
      ])
    ].map(e => e.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${fileName}.csv`);
    a.click();
  };
  