"use client";
import React from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState, Connection, Edge } from 'reactflow';
import { Button } from '@/components/ui/button';
import 'reactflow/dist/style.css';

type NodeData = {
  label: string;
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } as NodeData },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'API Request' } as NodeData }
];

const initialEdges: Edge[] = [];

export default function WorkflowsPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = React.useState('Nouveau Workflow');
  const [saving, setSaving] = React.useState(false);

  const saveWorkflow = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, graph: { nodes, edges } })
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const onConnect = React.useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  }, [setEdges]);

  return (
    <main className="h-[calc(100vh-2rem)] p-4 space-y-2">
      <div className="flex items-center gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-72 rounded-md border border-white/10 bg-white/5 p-2" />
        <Button onClick={saveWorkflow} disabled={saving}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</Button>
      </div>
      <div className="h-[calc(100%-3rem)] rounded-md border border-white/10 bg-white/5">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </main>
  );
}

