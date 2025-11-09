import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImportExportProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "import" | "export";
}

const LeadImportExport: React.FC<ImportExportProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    setProgress(0);

    // Simulate import process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          setImportResult({
            success: 245,
            failed: 5,
            errors: [
              "Row 12: Invalid email format",
              "Row 45: Missing required field 'name'",
              "Row 78: Duplicate entry",
              "Row 112: Invalid phone number",
              "Row 198: Missing required field 'email'",
            ],
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = (format: "csv" | "xlsx") => {
    console.log(`Exporting leads as ${format}`);
    // In a real app, this would generate and download the file
    const mockData = "Name,Email,Phone,Status,Score\n" +
      "John Smith,john@example.com,555-0100,Qualified,85\n" +
      "Sarah Johnson,sarah@example.com,555-0101,New,92\n" +
      "Michael Chen,michael@example.com,555-0102,Contacted,78";

    const blob = new Blob([mockData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split("T")[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>
            {mode === "import" ? "Import Leads" : "Export Leads"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === "import"
              ? "Upload a CSV or Excel file to import leads into your system"
              : "Download your leads in CSV or Excel format"}
          </DialogDescription>
        </DialogHeader>

        {mode === "import" ? (
          <div className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-slate-600 transition-colors">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <p className="text-lg font-medium mb-2">
                  {selectedFile ? selectedFile.name : "Choose a file or drag it here"}
                </p>
                <p className="text-sm text-slate-400">
                  Supports CSV, XLS, XLSX files up to 10MB
                </p>
              </label>
            </div>

            {/* Template Download */}
            <Alert className="bg-slate-700/50 border-slate-600">
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-slate-300">
                Don't have a file ready?{" "}
                <button
                  className="text-blue-400 hover:text-blue-300 underline"
                  onClick={() => handleExport("csv")}
                >
                  Download a template
                </button>{" "}
                to get started.
              </AlertDescription>
            </Alert>

            {/* Import Progress */}
            {importing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="text-sm text-slate-400">Importing leads...</p>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-slate-400 text-right">{progress}%</p>
              </motion.div>
            )}

            {/* Import Results */}
            {importResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                        <div>
                          <p className="text-2xl font-bold text-green-400">
                            {importResult.success}
                          </p>
                          <p className="text-sm text-slate-400">
                            Successfully imported
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-8 w-8 text-red-400" />
                        <div>
                          <p className="text-2xl font-bold text-red-400">
                            {importResult.failed}
                          </p>
                          <p className="text-sm text-slate-400">Failed to import</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {importResult.errors.length > 0 && (
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-slate-300">
                        Import Errors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {importResult.errors.map((error, index) => (
                          <div
                            key={index}
                            className="text-sm text-red-400 flex items-start gap-2"
                          >
                            <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={!selectedFile || importing}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                {importing ? "Importing..." : "Import Leads"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Export Options */}
            <div className="grid grid-cols-1 gap-4">
              <Card
                className="bg-slate-700/50 border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors"
                onClick={() => handleExport("csv")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        Export as CSV
                      </h3>
                      <p className="text-sm text-slate-400">
                        Compatible with Excel, Google Sheets, and most spreadsheet
                        applications
                      </p>
                    </div>
                    <Download className="h-5 w-5 text-slate-400" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="bg-slate-700/50 border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors"
                onClick={() => handleExport("xlsx")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        Export as Excel (XLSX)
                      </h3>
                      <p className="text-sm text-slate-400">
                        Native Excel format with formatting and formulas preserved
                      </p>
                    </div>
                    <Download className="h-5 w-5 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Info */}
            <Alert className="bg-slate-700/50 border-slate-600">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-slate-300">
                Your export will include all leads with their current status,
                contact information, and custom fields. Sensitive data like
                passwords are excluded for security.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadImportExport;
