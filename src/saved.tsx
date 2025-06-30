import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// All table color themes (must match Nowyplan.tsx)
const colourOptions = [
	{
		name: "Domyślny",
		bg: "#ffe0ec",
		border: "#a7c7e7",
		text: "#4b3f72",
		accent: "#f7b267",
	},
	{
		name: "Niebieski",
		bg: "#a7c7e7",
		border: "#4b3f72",
		text: "#22223b",
		accent: "#4b3f72",
	},
	{
		name: "Ciemny",
		bg: "#232946",
		border: "#121629",
		text: "#eebbc3",
		accent: "#eebbc3",
	},
	{
		name: "Miętowy",
		bg: "#e0fff7",
		border: "#38b6ff",
		text: "#1b4965",
		accent: "#38b6ff",
	},
	{
		name: "Zielony",
		bg: "#eafbea",
		border: "#38b000",
		text: "#004b23",
		accent: "#38b000",
	},
	{
		name: "Pomarańczowy",
		bg: "#fff4e6",
		border: "#ff8800",
		text: "#7c4700",
		accent: "#ff8800",
	},
	{
		name: "Fioletowy",
		bg: "#f3e8ff",
		border: "#a259f7",
		text: "#3d246c",
		accent: "#a259f7",
	},
	{
		name: "Różowy",
		bg: "#ffe0f7",
		border: "#ff5eae",
		text: "#a4133c",
		accent: "#ff5eae",
	},
];

const Saved: React.FC = () => {
	const [savedTables, setSavedTables] = useState<any[]>([]);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const data = localStorage.getItem("savedTimetables");
		setSavedTables(data ? JSON.parse(data) : []);
	}, []);

	// Helper to update a checkbox in a table
	const handleCheckboxChange = (
		tableIdx: number,
		rowIdx: number,
		colIdx: number
	) => {
		setSavedTables((prev) => {
			const updated = prev.map((table, tIdx) => {
				if (tIdx !== tableIdx) return table;
				const newTableData = table.tableData.map((row: any[], rIdx: number) =>
					rIdx === rowIdx
						? row.map((cell: any, cIdx: number) =>
								cIdx === colIdx ? !cell : cell
						  )
						: row
				);
				return { ...table, tableData: newTableData };
			});

			// Check if all checkboxes in this table are checked
			const table = updated[tableIdx];
			let allChecked = true;
			for (let r = 0; r < table.tableData.length; r++) {
				for (let c = 0; c < table.columns.length; c++) {
					if (
						table.columnTypes &&
						table.columnTypes[c] === "checkbox" &&
						!table.tableData[r][c]
					) {
						allChecked = false;
					}
					if (
						table.rowTypes &&
						table.rowTypes[r] === "checkbox" &&
						!table.tableData[r][c]
					) {
						allChecked = false;
					}
				}
			}
			if (allChecked) {
				setTimeout(() => {
					if (
						window.confirm(
							"Wszystkie checkboxy są zaznaczone. Czy chcesz usunąć ten plan?"
						)
					) {
						// Remove from localStorage and state
						const newTables = updated.filter((_, idx) => idx !== tableIdx);
						setSavedTables(newTables);
						localStorage.setItem("savedTimetables", JSON.stringify(newTables));
					}
				}, 100);
			} else {
				// Save updated state to localStorage
				localStorage.setItem("savedTimetables", JSON.stringify(updated));
			}
			return updated;
		});
	};

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				minHeight: "100vh",
				minWidth: "100vw",
				background: "var(--bg)",
				padding: 0,
				fontFamily: "inherit",
				overflowY: "auto",
				display: "flex",
				flexDirection: "row",
				alignItems: "stretch",
			}}
		>
			{/* Sidebar */}
			{sidebarOpen && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: 220,
						height: "100vh",
						background: "var(--sidebar)",
						borderRight: "1px solid var(--accent)",
						boxShadow: "2px 0 8px rgba(75,63,114,0.03)",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						padding: "2rem 1rem",
						zIndex: 20,
						transition:
							"transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)",
						transform: sidebarOpen ? "translateX(0)" : "translateX(-240px)",
						opacity: sidebarOpen ? 1 : 0,
						pointerEvents: sidebarOpen ? "auto" : "none",
					}}
				>
					{/* Top section */}
					<div
						style={{
							width: "100%",
							marginBottom: "2.5rem",
							textAlign: "center",
						}}
					>
						<img
							src="/image1.png"
							alt="Logo"
							style={{
								width: "54px",
								height: "54px",
								objectFit: "contain",
								marginBottom: "0.5rem",
								marginTop: "-1rem",
							}}
						/>
						<div
							style={{
								fontWeight: "bold",
								fontSize: "1.5rem",
								color: "var(--text)",
								marginBottom: "0.2rem",
								letterSpacing: "1px",
							}}
						>
							Planer zadań
						</div>
						<div
							style={{
								fontSize: "0.95rem",
								color: "var(--text)",
								fontStyle: "italic",
								opacity: 0.7,
							}}
						>
							created by Anna Korzeniewska 53522
						</div>
					</div>
					<button
						onClick={() => setSidebarOpen(false)}
						style={{
							position: "absolute",
							top: 10,
							right: -18,
							width: 28,
							height: 28,
							borderRadius: "50%",
							border: "1px solid var(--accent)",
							background: "#fff",
							color: "var(--text)",
							cursor: "pointer",
							boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
							zIndex: 3,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: "bold",
							fontSize: "1.1rem",
							transition: "right 0.2s",
						}}
						title="Ukryj panel"
					>
						←
					</button>
					<nav style={{ marginTop: "2.5rem", width: "100%" }}>
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							<li
								style={{
									marginBottom: "1.5rem",
									fontWeight: "bold",
									color: "var(--accent)",
								}}
							>
								<button
									style={{
										background: "none",
										border: "none",
										color: "var(--accent)",
										fontWeight: "bold",
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/")}
								>
									Strona główna
								</button>
							</li>
							<li style={{ marginBottom: "1.5rem", color: "var(--text)" }}>
								<button
									style={{
										background: "none",
										border: "none",
										color: "var(--text)",
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/saved")}
								>
									Moje zadania
								</button>
							</li>
							<li style={{ marginBottom: "1.5rem", color: "var(--text)" }}>
								<button
									style={{
										background: "none",
										border: "none",
										color: "var(--text)",
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/settings")}
								>
									Ustawienia
								</button>
							</li>
							<li
								style={{
									marginBottom: "1.5rem",
									color: "var(--accent)",
									fontWeight: "bold",
								}}
							>
								<button
									style={{
										background: "none",
										border: "none",
										color: "var(--accent)",
										fontWeight: "bold",
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/nowyplan")}
								>
									Nowy plan
								</button>
							</li>
						</ul>
					</nav>
				</div>
			)}
			{!sidebarOpen && (
				<button
					onClick={() => setSidebarOpen(true)}
					style={{
						position: "fixed",
						top: 28,
						left: 0,
						width: 28,
						height: 28,
						borderRadius: "50%",
						border: "1px solid var(--accent)",
						background: "#fff",
						color: "var(--text)",
						cursor: "pointer",
						boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
						zIndex: 30,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: "bold",
						fontSize: "1.1rem",
						marginLeft: "4px",
						transition:
							"left 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)",
					}}
					title="Pokaż panel"
				>
					→
				</button>
			)}
			{/* Main content */}
			<div style={{ flex: 1, paddingLeft: sidebarOpen ? "2rem" : 0 }}>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginBottom: "2.5rem",
						marginTop: "1.5rem",
					}}
				>
					<div
						style={{
							fontSize: "2rem",
							fontWeight: "bold",
							color: "var(--text)",
							letterSpacing: "1px",
							textAlign: "center",
							textShadow:
								"0 2px 8px rgba(75,63,114,0.10), 0 1px 1px rgba(0,0,0,0.06)",
						}}
					>
						Zapisane plany
					</div>
					<div
						style={{
							width: "90px",
							height: "6px",
							margin: "0.5rem auto 0 auto",
							background:
								"linear-gradient(90deg, var(--accent) 0 40%, transparent 100%)",
							borderRadius: "6px",
							opacity: 0.7,
						}}
					/>
				</div>
				{savedTables.length === 0 && (
					<div style={{ color: "var(--text)" }}>Brak zapisanych planów.</div>
				)}
				{savedTables.map((table, tableIdx) => {
					// Find the full theme object by name (for backward compatibility)
					const theme =
						colourOptions.find((opt) => opt.name === table.appearance?.name) ||
						table.appearance ||
						colourOptions[0];
					return (
						<div
							key={table.date}
							style={{
								background: theme.bg,
								borderRadius: "1rem",
								padding: "1.5rem",
								marginBottom: "2rem",
								boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
								maxWidth: "900px",
								width: "100%",
								overflowX: "auto",
								marginLeft: "auto",
								marginRight: "auto",
								fontFamily: table.font,
								position: "relative",
							}}
						>
							<button
								onClick={() => {
									if (window.confirm("Czy na pewno chcesz usunąć ten plan?")) {
										const newTables = savedTables.filter(
											(_, idx) => idx !== tableIdx
										);
										setSavedTables(newTables);
										localStorage.setItem(
											"savedTimetables",
											JSON.stringify(newTables)
										);
									}
								}}
								style={{
									position: "absolute",
									top: 8,
									right: 8, // <-- move to the right
									width: 28,
									height: 28,
									borderRadius: "50%",
									border: `1px solid ${theme.accent}`,
									background: "#fff",
									color: theme.accent,
									cursor: "pointer",
									boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
									zIndex: 5,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontWeight: "bold",
									fontSize: "1.1rem",
									transition: "background 0.2s",
								}}
								title="Usuń plan"
							>
								×
							</button>
							{/* PLAN NAME DISPLAY */}
							<div
								style={{
									marginBottom: "0.5rem",
									color: theme.text,
									fontWeight: "bold",
									fontSize: "1.2rem",
								}}
							>
								{table.name ? table.name : "Plan bez nazwy"}
							</div>
							<div
								style={{
									marginBottom: "1rem",
									color: theme.text,
									fontWeight: "bold",
								}}
							>
								Plan zapisany:{" "}
								{new Date(table.date).toLocaleString()}
							</div>
							<table
								style={{
									width: "100%",
									borderCollapse: "separate",
									borderSpacing: "4px 6px",
									fontFamily: table.font,
								}}
							>
								<thead>
									<tr>
										{table.columns.map((col: string, idx: number) => (
											<th
												key={idx}
												style={{
													border: `1px solid ${theme.border}`,
													padding: "0.5rem",
													background: theme.bg,
													color: theme.text,
													borderRadius: "0.4rem",
												}}
											>
												{col || `Kolumna ${idx + 1}`}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{table.tableData.map(
										(row: (string | boolean)[], rowIdx: number) => (
											<tr key={rowIdx}>
												{row.map((cell: string | boolean, colIdx: number) => {
													const isCheckbox =
														(table.columnTypes &&
															table.columnTypes[colIdx] === "checkbox") ||
														(table.rowTypes &&
															table.rowTypes[rowIdx] === "checkbox");
													return (
														<td
															key={colIdx}
															style={{
																border: `1px solid ${theme.border}`,
																padding: "0.5rem",
																background: "#fff",
																borderRadius: "0.4rem",
																textAlign: "center",
															}}
														>
															{isCheckbox ? (
																<input
																	type="checkbox"
																	checked={!!cell}
																	onChange={() =>
																		handleCheckboxChange(tableIdx, rowIdx, colIdx)
																	}
																	style={{
																		width: "1.2em",
																		height: "1.2em",
																	}}
																/>
															) : typeof cell === "string" ? (
																cell
															) : (
																""
															)}
														</td>
													);
												})}
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Saved;