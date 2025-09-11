using UnityEngine;
using System;
using System.IO;
using System.Collections.Generic;

// Private class to handle file I/O operations
class DiskLogger
{
    private string logFilePath;

    public DiskLogger()
    {
        string timestamp = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
        string fileName = $"SerializeAndPrint.cs.{timestamp}.txt";
        this.logFilePath = Path.Combine(Application.dataPath, fileName);
    }

    public void WriteLog(string content)
    {
        try
        {
            File.AppendAllText(logFilePath, content);
            Debug.Log($"Successfully wrote to log file at: {logFilePath}");
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to write to log file: {e.Message}");
        }
    }
}

class BatchedLogger : MonoBehaviour
{
    private List<string> logBuffer = new List<string>();
    private DiskLogger diskLogger = new DiskLogger();
    public int batchSize = 200;

    public void Log(string message)
    {
        logBuffer.Add(message);

        if (logBuffer.Count >= batchSize)
        {
            Flush();
        }
    }

    public void Flush()
    {
        if (logBuffer.Count == 0) return;

        string combined = string.Join("\n", logBuffer);
        Debug.Log($"--- BatchedLogger Output ({logBuffer.Count} messages) ---\n{combined}");

        diskLogger.WriteLog(combined + "\n");
        logBuffer.Clear();
    }

    private void OnDestroy()
    {
        Flush();
    }
}

class SkinnedMeshRendererInspector
{
    private readonly BatchedLogger logger;

    public SkinnedMeshRendererInspector(BatchedLogger logger)
    {
        this.logger = logger;
    }

    public void Inspect(Transform t)
    {
        // Check if this transform has a SkinnedMeshRenderer
        var smr = t.GetComponent<SkinnedMeshRenderer>();
        if (smr == null || smr.sharedMesh == null)
            return; // Nothing to inspect here

        Mesh mesh = smr.sharedMesh;
        int blendShapeCount = mesh.blendShapeCount;

        if (blendShapeCount > 0)
        {
            logger.Log($"    Blendshapes ({blendShapeCount}):");
            for (int i = 0; i < blendShapeCount; i++)
            {
                string shapeName = mesh.GetBlendShapeName(i);
                logger.Log($"      [{i}] {shapeName}");
            }
        }
    }
}

class MiddlewareCompressSubsequentPaths
{
    private string[] previousParts = Array.Empty<string>();
    private const string PlaceholderToken = "↑";

    public string Next(string currentPath)
    {
        // Split into parts
        string[] currentParts = currentPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        List<string> outputParts = new List<string>();

        // Compare element by element
        for (int i = 0; i < currentParts.Length; i++)
        {
            if (i < previousParts.Length && currentParts[i] == previousParts[i])
            {
                outputParts.Add(PlaceholderToken);
            }
            else
            {
                outputParts.Add(currentParts[i]);
            }
        }

        // Save for next comparison
        previousParts = currentParts;

        // Reassemble into path-like string
        return "/" + string.Join("/", outputParts);
    }
}


public class SerializeAndPrint : MonoBehaviour
{
    [Tooltip("List of keywords to search for in child object names")]
    public string[] keywords = { "" };

    [Tooltip("Compress subsequent paths starting with the same elements")]
    public bool compressPaths = true;

    private BatchedLogger logger;
    private SkinnedMeshRendererInspector skinnedMeshRendererInspector;

    private MiddlewareCompressSubsequentPaths pathCompressor = new MiddlewareCompressSubsequentPaths();

    void Start()
    {
        if (logger == null)
        {
            logger = gameObject.AddComponent<BatchedLogger>();
        }

        if (skinnedMeshRendererInspector == null)
        {
            skinnedMeshRendererInspector = new SkinnedMeshRendererInspector(logger);
        }

        Transform[] allTransforms = GetComponentsInChildren<Transform>();

        foreach (Transform t in allTransforms)
        {
            foreach (string keyword in keywords)
            {
                if (t.name.ToLower().Contains(keyword.ToLower()))
                {
                    // write name path of gameobject
                    if (compressPaths)
                    {
                        logger.Log(pathCompressor.Next(GetFullPath(t)));
                    }
                    else
                    {
                        logger.Log(GetFullPath(t));
                    }
                    // inspect
                    skinnedMeshRendererInspector.Inspect(t);
                }
            }
        }

        logger.Flush();
    }

    string GetFullPath(Transform t)
    {
        if (t.parent == null) return t.name;
        return GetFullPath(t.parent) + "/" + t.name;
    }
}
